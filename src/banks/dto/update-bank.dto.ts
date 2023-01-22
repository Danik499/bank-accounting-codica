import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateBankDto {
    @ApiProperty({ example: '1', description: 'Unique identifier' })
    @IsNumber()
    readonly id: number;

    @ApiProperty({ example: 'Privat', description: 'The bank name' })
    @IsString({ message: 'Should be string' })
    readonly name: string;
}