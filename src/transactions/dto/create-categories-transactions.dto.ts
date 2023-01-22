import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoriesTransactionsDto {
    @ApiProperty({ example: '1', description: 'The transaction id' })
    readonly transaction: number;

    @ApiProperty({ example: '1', description: 'The category id' })
    readonly category: number;

    @ApiProperty({ example: '1', description: 'Amoun by this category' })
    readonly amount: number;
}