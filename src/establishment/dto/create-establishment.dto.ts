import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateEstablishmentDto {

    @ApiProperty({
        description: 'Nome do estabelecimento.',
        example: 'Barbearia Top',
      })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Telefone do estabelecimento.',
        example: '(31) 999999999',
      })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'Email do estabelecimento.',
        example: 'estabelecimento@gmail.com',
      })
    @IsString()
    email: string;

}