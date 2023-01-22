import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { Transaction } from "./transactions.model";


@Table({ tableName: 'categories_transactions', createdAt: false, updatedAt: false })
export class CategoriesTransactions extends Model<CategoriesTransactions> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Transaction)
    @Column({ type: DataType.INTEGER })
    transaction: number;
    
    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    category: number;

    @Column({ type: DataType.DECIMAL })
    amount: number;

    @BelongsTo(() => Transaction)
    transactions: Transaction[]
}