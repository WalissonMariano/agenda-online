import { ReturnProductServiceDto } from '../../product-service/dto/return-product-service.dto';
import { ScheduleServiceEntity } from '../entities/schedule-service.entity';

export class ReturnScheduleServiceDto {
  id: number;
  scheduleId: number;
  serviceId: number;
  quantity: number;
  totalPrice: number;
  productService?: ReturnProductServiceDto;

  constructor(scheduleService: ScheduleServiceEntity) {
    this.id = scheduleService.id;
    this.scheduleId = scheduleService.scheduleId;
    this.serviceId = scheduleService.serviceId;
    this.quantity = scheduleService.quantity;
    this.totalPrice = Number(scheduleService.totalPrice);
    this.productService = scheduleService.productService
      ? new ReturnProductServiceDto(scheduleService.productService)
      : undefined;
  }
}
