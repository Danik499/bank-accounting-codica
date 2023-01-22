import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Transaction } from 'src/transactions/transactions.model';
import { Bank } from './banks.model';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BanksService {
    constructor (@InjectModel(Bank) private banksRepository: typeof Bank,
                 @InjectModel(Transaction) private transactionRepository: typeof Transaction) {}

    async createBank(dto: CreateBankDto) {
        if (await this.banksRepository.findOne({ where: { name: dto.name } })) {
            throw new HttpException(`Name '${dto.name}' is already taken`, HttpStatus.BAD_REQUEST);
        }

        const bank = await this.banksRepository.create(dto);
        return {
            status: 'success',
            data: bank
        };
    }

    async getAllBanks() {
        const banks = await this.banksRepository.findAll();
        return {
            status: 'success',
            data: banks
        };
    }

    async getBankById(id) {
        const bank = await this.banksRepository.findOne({ where: { id } });
        if (!bank) {
            throw new HttpException('The bank could not be found', HttpStatus.NOT_FOUND);
        }

        return {
            status: 'success',
            data: bank
        };
    }

    async updateBank(dto: UpdateBankDto) {
        if (!(await this.banksRepository.findByPk(dto.id))) {
            throw new HttpException('The bank could not be found', HttpStatus.NOT_FOUND);
        }

        if (await this.banksRepository.findOne({ where: { name: dto.name } })) {
            throw new HttpException(`Name '${dto.name}' is already taken`, HttpStatus.BAD_REQUEST);
        }

        const bank = await this.banksRepository.update({ name: dto.name }, {
            where: { id: dto.id },
            returning: true
        });

        return {
            status: 'success',
            data: bank[1][0]
        };
    }

    async deleteBank(id) {
        const bank = await this.banksRepository.findByPk(id);
        if (!bank) {
            throw new HttpException('The bank could not be found', HttpStatus.NOT_FOUND);
        }

        const bankTransactions = await this.transactionRepository.findAll({ where: { bank: id } });
        if (bankTransactions[0]) {
            throw new HttpException('Could not delete the bank because it has transactions', HttpStatus.BAD_REQUEST);
        }

        await this.banksRepository.destroy({ where: { id } });
        return {
            status: 'success'
        }
    }
}