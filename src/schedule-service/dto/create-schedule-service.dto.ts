import { IsNumber } from "class-validator";

export class CreateScheduleServiceDto {

    scheduleId: number;

    @IsNumber()
    serviceId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    totalPrice: number;

}