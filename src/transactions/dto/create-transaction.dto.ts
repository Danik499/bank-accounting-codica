import { IsNumber, IsEnum, IsUrl } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export type TransactionCategory = {
    name: string,
    amount: number
}

export enum TransactionTypes {
    profitable = 'profitable',
    consumable = 'consumable'
}

export class CreateTransactionDto {
    @ApiProperty({ example: '1', description: 'The bank id' })
    @IsNumber()
    readonly bank: number;

    @ApiProperty({ example: 'consumable', description: 'The transaction type (profitable | consumable)' })
    @IsEnum(['profitable', 'consumable'], { message: 'Transaction type should be \'profitable\' or \'consumable\'' })
    readonly type: TransactionTypes;

    @ApiProperty({ example: 'https://some.domain/example', description: 'URL where to send updates' })
    @IsUrl()
    readonly webhook: string;

    @ApiProperty({ example: [{name: 'food', amount: 430 }, { name: 'drinks', amount: 240 }], description: 'The transaction categories' })
    readonly categories: Array<TransactionCategory>
}