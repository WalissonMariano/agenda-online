import { ReturnUserDto } from "src/user/dto/return-user.dto";
import { ScheduleEntity } from "../entities/schedule.entity";
import { ReturnEstablishmentDto } from "src/establishment/dto/return-establishment.dto";
import { ReturnStateDto } from "src/state/dto/return-state.dto";
import { ReturnStatusDto } from "src/status/dto/return-status.dto";
import { ReturnScheduleServiceDto } from "src/schedule-service/dto/return-schedule-service.dto";

export class ReturnScheduleDto {
    id: number;
    status: ReturnStateDto;
    scheduleDate: Date;
    user: ReturnUserDto;
    establishment: ReturnEstablishmentDto;
    scheduleService: ReturnScheduleServiceDto[];

    constructor(schedule: ScheduleEntity){
        this.id = schedule.id;
        this.status = schedule.status ? new ReturnStatusDto(schedule.status) : undefined;
        this.scheduleDate = schedule.scheduleDate;
        this.user = schedule.user ? new ReturnUserDto(schedule.user) : undefined;
        this.establishment = schedule.establishment ? new ReturnEstablishmentDto(schedule.establishment) : undefined;
        this.scheduleService = schedule.scheduleService ? schedule.scheduleService.map( 
            (scheduleService) => new ReturnScheduleServiceDto(scheduleService) 
        ) : undefined;
    }

}