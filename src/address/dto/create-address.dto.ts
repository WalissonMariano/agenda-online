import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateAddressDto {

    @ApiProperty({
        description: 'Id do estabelecimento.',
        example: 3,
      })
    @IsInt()
    establishmentId: number;

    @ApiProperty({
        description: 'Rua do endereço.',
        example: 'Rua J',
      })
    @IsString()
    street: string;

    @ApiProperty({
        description: 'Bairro do endereço.',
        example: 'Belvedere',
      })
    @IsString()
    district: string;

    @ApiProperty({
        description: 'Numero do endereço.',
        example: 567,
      })
    @IsInt()
    number: number;

    @ApiProperty({
        description: 'Cep do endereço.',
        example: '56789-789',
      })
    @IsString()
    cep: string;

    @ApiProperty({
        description: 'Id da cidade.',
        example: 458,
      })
    @IsInt()
    cityId: number;

}