import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ScheduleServiceEntity } from './entities/schedule-service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScheduleServiceService {
    constructor(
        @InjectRepository(ScheduleServiceEntity)
        private readonly scheduleServiceRepository: Repository<ScheduleServiceEntity>
    ){}
}
