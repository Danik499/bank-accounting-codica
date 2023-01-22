import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bank } from "./banks/banks.model";
import { BanksModule } from './banks/banks.module';
import { Category } from "./categories/categories.model";
import { CategoriesModule } from './categories/categories.module';
import { CategoriesTransactions } from "./transactions/categories-transactions.model";
import { Transaction } from "./transactions/transactions.model";
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Bank, Category, Transaction, CategoriesTransactions],
            autoLoadModels: true
        }),
        BanksModule,
        CategoriesModule,
        TransactionsModule,
        StatisticsModule
    ]
})
export class AppModule {
    
}