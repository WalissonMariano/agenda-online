import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateScheduleServiceDto {
  @ApiProperty({ description: 'Id do produto/serviço.', example: 1 })
  @IsInt()
  serviceId: number;

  @ApiProperty({ description: 'Quantidade.', example: 1 })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Id do agendamento (obrigatório no CRUD standalone).',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  scheduleId?: number;
}
