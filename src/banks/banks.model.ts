import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, DataType, Column, HasMany } from 'sequelize-typescript';
import { Transaction } from 'src/transactions/transactions.model';

interface BankCreatingAttrs {
    name: string
}

@Table({ tableName: 'banks' })
export class Bank extends Model<Bank, BankCreatingAttrs> {
    @ApiProperty({ example: 1, description: 'Unique identifier' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Privat', description: 'The Bank name' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({ example: '10000', description: 'The Bank balance' })
    @Column({ type: DataType.DECIMAL, allowNull: false, defaultValue: 0 })
    balance: number;

    @HasMany(() => Transaction)
    transaction: Transaction[];
}