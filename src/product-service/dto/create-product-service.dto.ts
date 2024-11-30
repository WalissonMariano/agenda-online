import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductServiceDto {

    @ApiProperty({
        description: 'Nome do serviço.',
        example: 'Corte e Barba',
      })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Tempo gasto para serviço.',
        example: '2 hours 30 minutes',
      })
    @IsString()
    time: string;

    @ApiProperty({
        description: 'Preço do serviço.',
        example: 49.99,
      })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Imagem do serviço.',
        example: 'corte-barba.png',
      })
    @IsString()
    image: string;

    @ApiProperty({
        description: 'Id da categoria do serviço.',
        example: 156,
      })
    @IsNumber()
    categoryId: number;

}