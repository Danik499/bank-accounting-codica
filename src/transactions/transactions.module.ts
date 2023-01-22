import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bank } from 'src/banks/banks.model';
import { Category } from 'src/categories/categories.model';
import { CategoriesTransactions } from './categories-transactions.model';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transactions.model';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    SequelizeModule.forFeature([Transaction, Bank, Category, CategoriesTransactions])
  ]
})
export class TransactionsModule {}
