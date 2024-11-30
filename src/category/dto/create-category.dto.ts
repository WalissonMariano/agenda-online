import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({
        description: 'Nome da categoria.',
        example: 'barba',
      })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Descrição da categoria.',
        example: 'barba',
      })
    @IsString()
    description: string;

}