import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'Maria Gabriela Gonçalves',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'teste@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'CPF do usuário.',
    example: '111.111.111-11',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'Telefone do usuário.',
    example: '(31) 999999999',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Senha do usuário.',
    example: 'teste123',
  })
  @IsString()
  password: string;
}
