import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class InputDataDto {
    @ApiProperty({ example: [1, 3], description: 'A list of categories ids by wich to calculate statistics' })
    @IsNumber({}, { each: true })
    readonly categories: number[];

    @ApiProperty({ example: '2023/01/01', description: 'Start of the period (YYYY/MM/DD)' })
    readonly fromDate: string;

    @ApiProperty({ example: '2023/01/30', description: 'End of the period (YYYY/MM/DD)' })
    readonly toDate: string;
}