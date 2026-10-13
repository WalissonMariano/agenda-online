import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateProfessionalDto {
  @ApiProperty({ description: 'Id do usuário.', example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'Id do estabelecimento.', example: 1 })
  @IsInt()
  establishmentId: number;
}
