import { IsNumber } from "class-validator";

export class CreateScheduleServiceDto {

    @IsNumber()
    scheduleId: number;

    @IsNumber()
    serviceId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    totalPrice: number;

}