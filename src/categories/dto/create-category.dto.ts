import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: 'Should be string' })
    @ApiProperty({ example: 'food', description: 'The category name' })
    readonly name: string;
}