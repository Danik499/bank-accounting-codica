import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({ example: '1', description: 'Unique identifier' })
    @IsNumber()
    readonly id: number;

    @ApiProperty({ example: 'food', description: 'The category name' })
    @IsString({ message: 'Should be string' })
    readonly name: string;
}