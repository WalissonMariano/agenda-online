import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateScheduleServiceDto } from '../../schedule-service/dto/create-schedule-service.dto';

export class CreateScheduleDto {
  @ApiProperty({ description: 'Usuário da agenda.', example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'Estabelecimento da agenda.', example: 1 })
  @IsInt()
  establishmentId: number;

  @ApiProperty({ description: 'Profissional da agenda.', example: 1 })
  @IsInt()
  professionalId: number;

  @ApiProperty({ description: 'Status da agenda.', example: 1 })
  @IsInt()
  statusId: number;

  @ApiProperty({ description: 'Data da agenda.', example: '2024-10-10' })
  @IsDateString()
  scheduleDate: Date;

  @ApiProperty({ type: [CreateScheduleServiceDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleServiceDto)
  scheduleService?: CreateScheduleServiceDto[];
}
