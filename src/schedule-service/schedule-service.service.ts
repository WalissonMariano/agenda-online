import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductServiceService } from '../product-service/product-service.service';
import { ScheduleService as BookingScheduleService } from '../schedule/schedule.service';
import { CreateScheduleServiceDto } from './dto/create-schedule-service.dto';
import { UpdateScheduleServiceDto } from './dto/update-schedule-service.dto';
import { ScheduleServiceEntity } from './entities/schedule-service.entity';

@Injectable()
export class ScheduleServiceService {
  constructor(
    @InjectRepository(ScheduleServiceEntity)
    private readonly scheduleServiceRepository: Repository<ScheduleServiceEntity>,
    private readonly bookingScheduleService: BookingScheduleService,
    private readonly productServiceService: ProductServiceService,
  ) {}

  async getAllScheduleService(): Promise<ScheduleServiceEntity[]> {
    return this.scheduleServiceRepository.find();
  }

  async getScheduleServiceById(id: number): Promise<ScheduleServiceEntity> {
    const scheduleService = await this.scheduleServiceRepository.findOne({
      where: { id },
    });

    if (!scheduleService) {
      throw new NotFoundException(`Item de agendamento ${id} não encontrado.`);
    }

    return scheduleService;
  }

  async createScheduleService(
    createScheduleServiceDto: CreateScheduleServiceDto,
  ): Promise<ScheduleServiceEntity> {
    if (!createScheduleServiceDto.scheduleId) {
      throw new BadRequestException('scheduleId é obrigatório.');
    }

    await this.bookingScheduleService.getScheduleById(
      createScheduleServiceDto.scheduleId,
    );

    const productService =
      await this.productServiceService.getProductServiceById(
        createScheduleServiceDto.serviceId,
      );

    return this.scheduleServiceRepository.save({
      scheduleId: createScheduleServiceDto.scheduleId,
      serviceId: createScheduleServiceDto.serviceId,
      quantity: createScheduleServiceDto.quantity,
      totalPrice:
        Number(productService.price) * Number(createScheduleServiceDto.quantity),
    });
  }

  async updateScheduleService(
    id: number,
    updateScheduleServiceDto: UpdateScheduleServiceDto,
  ): Promise<ScheduleServiceEntity> {
    const scheduleService = await this.getScheduleServiceById(id);

    if (updateScheduleServiceDto.scheduleId) {
      await this.bookingScheduleService.getScheduleById(
        updateScheduleServiceDto.scheduleId,
      );
    }

    const serviceId =
      updateScheduleServiceDto.serviceId ?? scheduleService.serviceId;
    const quantity =
      updateScheduleServiceDto.quantity ?? scheduleService.quantity;

    const productService =
      await this.productServiceService.getProductServiceById(serviceId);

    return this.scheduleServiceRepository.save({
      ...scheduleService,
      ...updateScheduleServiceDto,
      totalPrice: Number(productService.price) * Number(quantity),
    });
  }

  async deleteScheduleService(id: number): Promise<DeleteResult> {
    await this.getScheduleServiceById(id);
    return this.scheduleServiceRepository.delete({ id });
  }
}
