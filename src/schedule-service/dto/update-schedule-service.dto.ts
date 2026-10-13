import { PartialType } from '@nestjs/swagger';
import { CreateScheduleServiceDto } from './create-schedule-service.dto';

export class UpdateScheduleServiceDto extends PartialType(
  CreateScheduleServiceDto,
) {}
