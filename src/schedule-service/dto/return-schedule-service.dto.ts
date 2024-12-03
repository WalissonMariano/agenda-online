import { ReturnProductServiceDto } from "src/product-service/dto/return-product-service.dto";
import { ScheduleServiceEntity } from "../entities/schedule-service.entity";

export class ReturnScheduleServiceDto {
    
    quantity: number;
    totalPrice: number;
    productService: ReturnProductServiceDto;

    constructor(scheduleService: ScheduleServiceEntity) {
        this.quantity = scheduleService.quantity;
        this.totalPrice = scheduleService.totalPrice;
        this.productService = scheduleService.productService ? 
            new ReturnProductServiceDto(scheduleService.productService) : undefined;
    }

}