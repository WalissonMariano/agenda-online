import { IsDate, IsInt } from "class-validator";

export class CreateScheduleDto {

    @IsInt()
    userId: number;

    @IsInt()
    establishmentId: number;

    @IsInt()
    statusId: number;

    @IsDate()
    scheduleDate: Date;

}