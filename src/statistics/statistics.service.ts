import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Category } from 'src/categories/categories.model';
import { CategoriesTransactions } from 'src/transactions/categories-transactions.model';
import { Transaction } from 'src/transactions/transactions.model';
import { InputDataDto } from './dto/input-data.dto';

@Injectable()
export class StatisticsService {
    constructor(@InjectModel(Category) private categoriesRepository: typeof Category,
                @InjectModel(Transaction) private transactionsRepository: typeof Transaction) {}

    async getStatistics(dto: InputDataDto) {
        const from = dto.fromDate.replace(/\D/g, '/');
        const to = dto.toDate.replace(/\D/g, '/');

        // Date validation. Should be YYYY/MM/DD
        const regex = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;
        if (!regex.test(from) || !regex.test(to)) {
            throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
        }

        const transactionsByCategories = await this.categoriesRepository.findAll({
            order: ['id'],
            include: [
                {
                    model: this.transactionsRepository,
                    where: {
                        createdAt: {
                            [Op.between]: [from, to]
                        }
                    }
                }
            ],
            where: {
                id: dto.categories
            }
        });

        const statistics: { [key: string]: string } = {};

        for (let category of transactionsByCategories) {
            const totalAmount = category.transactions.reduce((a, b: any) => {
                return b.type === 'profitable' ? a + +b.CategoriesTransactions.amount : a - +b.CategoriesTransactions.amount;
            }, 0);

            statistics[category.name] = totalAmount > 0 ? "+" + totalAmount : "" + totalAmount;
        };

        return {
            status: 'success',
            data: statistics
        };
    }
}
