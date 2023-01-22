import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBankDto {
    @ApiProperty({ example: 'Privat', description: 'The Bank name' })
    @IsString({ message: 'Should be string' })
    readonly name: string;
}