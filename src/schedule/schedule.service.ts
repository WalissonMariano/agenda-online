import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UserService } from 'src/user/user.service';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { StatusService } from 'src/status/status.service';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>,
        private readonly userService: UserService,
        private readonly establishmentService: EstablishmentService,
        private readonly statusService: StatusService
    ){}

    async getAllSchedule(): Promise<ScheduleEntity[]> {
        const schedule = await this.scheduleRepository.find();

        if(!schedule) {
            throw new NotFoundException(`Not found schedule`);
        }

        return schedule;
    }

    async getScheduleById(id: number): Promise<ScheduleEntity> {
        const schedule = await this.scheduleRepository.findOne({
            where: {
                id
            }
        });

        if(!schedule) {
            throw new NotFoundException(`Not found schedule id ${id}.`);
        }

        return schedule;
    }

    async createSchedule(
        createScheduleDto: CreateScheduleDto
    ): Promise<ScheduleEntity> {
        await this.userService.getUserById(createScheduleDto.userId);
        await this.establishmentService.getEstablishmentstById(createScheduleDto.establishmentId);
        await this.statusService.getStatusById(createScheduleDto.statusId);

        return this.scheduleRepository.save(createScheduleDto);
    }

    async deleteSchedule(id: number): Promise<DeleteResult> {
        await this.getScheduleById(id);

        return this.scheduleRepository.delete({id});
    }
}
