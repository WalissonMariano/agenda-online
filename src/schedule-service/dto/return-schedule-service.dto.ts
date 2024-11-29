import { ScheduleServiceEntity } from "../entities/schedule-service.entity";

export class ReturnScheduleServiceDto {
    
    quantity: number;
    totalPrice: number;

    constructor(scheduleService: ScheduleServiceEntity) {
        this.quantity = scheduleService.quantity;
        this.totalPrice = scheduleService.totalPrice;
    }

}