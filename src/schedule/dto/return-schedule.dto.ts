import { ReturnEstablishmentDto } from '../../establishment/dto/return-establishment.dto';
import { ReturnProfessionalDto } from '../../professional/dto/return-professional.dto';
import { ReturnScheduleServiceDto } from '../../schedule-service/dto/return-schedule-service.dto';
import { ReturnStatusDto } from '../../status/dto/return-status.dto';
import { ReturnUserDto } from '../../user/dto/return-user.dto';
import { ScheduleEntity } from '../entities/schedule.entity';

export class ReturnScheduleDto {
  id: number;
  scheduleDate: Date;
  user?: ReturnUserDto;
  establishment?: ReturnEstablishmentDto;
  professional?: ReturnProfessionalDto;
  status?: ReturnStatusDto;
  scheduleService?: ReturnScheduleServiceDto[];

  constructor(schedule: ScheduleEntity) {
    this.id = schedule.id;
    this.scheduleDate = schedule.scheduleDate;
    this.user = schedule.user
      ? new ReturnUserDto(schedule.user)
      : undefined;
    this.establishment = schedule.establishment
      ? new ReturnEstablishmentDto(schedule.establishment)
      : undefined;
    this.professional = schedule.professional
      ? new ReturnProfessionalDto(schedule.professional)
      : undefined;
    this.status = schedule.status
      ? new ReturnStatusDto(schedule.status)
      : undefined;
    this.scheduleService = schedule.scheduleService
      ? schedule.scheduleService.map(
          (item) => new ReturnScheduleServiceDto(item),
        )
      : undefined;
  }
}
