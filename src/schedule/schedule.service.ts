import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EstablishmentService } from '../establishment/establishment.service';
import { ProductServiceService } from '../product-service/product-service.service';
import { ProfessionalService } from '../professional/professional.service';
import { StatusService } from '../status/status.service';
import { UserService } from '../user/user.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    private readonly userService: UserService,
    private readonly establishmentService: EstablishmentService,
    private readonly statusService: StatusService,
    private readonly professionalService: ProfessionalService,
    private readonly productServiceService: ProductServiceService,
  ) {}

  async getAllSchedule(): Promise<ScheduleEntity[]> {
    return this.scheduleRepository.find();
  }

  async getScheduleById(id: number): Promise<ScheduleEntity> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
    });

    if (!schedule) {
      throw new NotFoundException(`Agendamento ${id} não encontrado.`);
    }

    return schedule;
  }

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleEntity> {
    await this.userService.getUserById(createScheduleDto.userId);
    await this.establishmentService.getEstablishmentById(
      createScheduleDto.establishmentId,
    );
    await this.statusService.getStatusById(createScheduleDto.statusId);

    const professional = await this.professionalService.getProfessionalById(
      createScheduleDto.professionalId,
    );

    if (professional.establishmentId !== createScheduleDto.establishmentId) {
      throw new BadRequestException(
        'Profissional não pertence ao estabelecimento informado.',
      );
    }

    const scheduleService = await this.buildScheduleServices(
      createScheduleDto.scheduleService || [],
    );

    return this.scheduleRepository.save({
      userId: createScheduleDto.userId,
      establishmentId: createScheduleDto.establishmentId,
      professionalId: createScheduleDto.professionalId,
      statusId: createScheduleDto.statusId,
      scheduleDate: createScheduleDto.scheduleDate,
      scheduleService,
    });
  }

  async updateSchedule(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    const schedule = await this.getScheduleById(id);

    if (updateScheduleDto.userId) {
      await this.userService.getUserById(updateScheduleDto.userId);
    }

    if (updateScheduleDto.establishmentId) {
      await this.establishmentService.getEstablishmentById(
        updateScheduleDto.establishmentId,
      );
    }

    if (updateScheduleDto.statusId) {
      await this.statusService.getStatusById(updateScheduleDto.statusId);
    }

    const establishmentId =
      updateScheduleDto.establishmentId ?? schedule.establishmentId;

    if (updateScheduleDto.professionalId) {
      const professional = await this.professionalService.getProfessionalById(
        updateScheduleDto.professionalId,
      );

      if (professional.establishmentId !== establishmentId) {
        throw new BadRequestException(
          'Profissional não pertence ao estabelecimento informado.',
        );
      }
    }

    const scheduleService = updateScheduleDto.scheduleService
      ? await this.buildScheduleServices(updateScheduleDto.scheduleService)
      : schedule.scheduleService;

    return this.scheduleRepository.save({
      ...schedule,
      ...updateScheduleDto,
      scheduleService,
    });
  }

  async deleteSchedule(id: number): Promise<DeleteResult> {
    await this.getScheduleById(id);
    return this.scheduleRepository.delete({ id });
  }

  private async buildScheduleServices(
    items: { serviceId: number; quantity: number }[],
  ) {
    const scheduleService = [];

    for (const item of items) {
      const productService =
        await this.productServiceService.getProductServiceById(item.serviceId);

      scheduleService.push({
        serviceId: item.serviceId,
        quantity: item.quantity,
        totalPrice: Number(productService.price) * Number(item.quantity),
      });
    }

    return scheduleService;
  }
}
