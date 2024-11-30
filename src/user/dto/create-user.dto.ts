import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateUserDto {

  @ApiProperty({
    description: 'Nome usuário.',
    example: 'Maria Gabriela Gonçalves',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do usuário.',
    example: 'teste@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Cpf do usuário.',
    example: '111.111.111-11',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'Tipo de usuário.',
    example: 1,
  })
  @IsInt()
  typeUser: number;

  @ApiProperty({
    description: 'Telefone do usuário.',
    example: '(31) 999999999',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Senha desse usuário.',
    example: 'teste123',
  })
  @IsString()
  password: string;
}
