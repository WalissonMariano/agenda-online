import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Nova senha.', example: 'novaSenha123' })
  @IsString()
  newPassword: string;

  @ApiProperty({ description: 'Senha atual.', example: 'senhaAtual123' })
  @IsString()
  lastPassword: string;
}
