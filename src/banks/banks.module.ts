import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from 'src/transactions/transactions.model';
import { BanksController } from './banks.controller';
import { Bank } from './banks.model';
import { BanksService } from './banks.service';

@Module({
  controllers: [BanksController],
  providers: [BanksService],
  imports: [
    SequelizeModule.forFeature([Bank, Transaction])
  ]
})
export class BanksModule {}
