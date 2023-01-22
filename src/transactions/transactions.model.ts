import { Model, Table, DataType, Column, ForeignKey, BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Bank } from 'src/banks/banks.model';
import { Category } from 'src/categories/categories.model';
import { CategoriesTransactions } from './categories-transactions.model';
import { TransactionTypes } from './dto/create-transaction.dto';
import { TransactionCategory } from './dto/create-transaction.dto';

interface TransactionCreatingAttrs {
    bank: number,
    type: TransactionTypes,
    webhook: string,
    categories: TransactionCategory[]
}

@Table({ tableName: 'transactions' })
export class Transaction extends Model<Transaction, TransactionCreatingAttrs> {
    @ApiProperty({ example: '1', description: 'Unique identifier' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'consumable', description: 'The transaction type' })
    @Column({ type: DataType.ENUM('profitable', 'consumable') })
    type: string;

    @ApiProperty({ example: 'https://some.domain/example', description: 'The transaction webhook' })
    @Column({ type: DataType.STRING })
    webhook: string;

    @ApiProperty({ example: '1', description: 'Reference to its bank' })
    @ForeignKey(() => Bank)
    @Column({ type: DataType.INTEGER })
    bank: number;

    @BelongsTo(() => Bank)
    owner: Bank;

    @BelongsToMany(() => Category, () => CategoriesTransactions)
    categories: Category[];

    @HasMany(() => CategoriesTransactions)
    categories_transactions: CategoriesTransactions[];
}