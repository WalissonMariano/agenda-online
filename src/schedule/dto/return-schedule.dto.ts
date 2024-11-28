import { ReturnUserDto } from "src/user/dto/return-user.dto";
import { Schedule } from "../entities/schedule.entity";
import { ReturnEstablishmentDto } from "src/establishment/dto/return-establishment.dto";
import { ReturnStateDto } from "src/state/dto/return-state.dto";
import { ReturnStatusDto } from "src/status/dto/return-status.dto";

export class ReturnScheduleDto {
    scheduleDate: Date;
    user: ReturnUserDto;
    establishment: ReturnEstablishmentDto;
    status: ReturnStateDto;

    constructor(schedule: Schedule){
        this.scheduleDate = schedule.scheduleDate;
        this.user = schedule.user ? new ReturnUserDto(schedule.user) : undefined;
        this.establishment = schedule.establishment ? new ReturnEstablishmentDto(schedule.establishment) : undefined;
        this.status = schedule.status ? new ReturnStatusDto(schedule.status) : undefined;
    }

}