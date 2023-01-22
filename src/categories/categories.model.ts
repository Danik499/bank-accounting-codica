import { Model, Table, DataType, Column, HasMany, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { CategoriesTransactions } from 'src/transactions/categories-transactions.model';
import { Transaction } from 'src/transactions/transactions.model';

interface CategoryCreatingAttrs {
    name: string
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreatingAttrs> {
    @ApiProperty({ example: '1', description: 'Unique identifier' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'food', description: 'The category name' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @BelongsToMany(() => Transaction, () => CategoriesTransactions)
    transactions: Transaction[];

    @HasMany(() => CategoriesTransactions)
    categoriesTransactions: CategoriesTransactions[];
}