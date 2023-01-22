import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
import { CategoriesTransactions } from 'src/transactions/categories-transactions.model';
import { Transaction } from 'src/transactions/transactions.model';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [
    SequelizeModule.forFeature([Transaction, Category, CategoriesTransactions])
  ]
})
export class StatisticsModule {}
