import { Module } from '@nestjs/common';
import { ScheduleServiceService } from './schedule-service.service';
import { ScheduleServiceEntity } from './entities/schedule-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleServiceEntity]),
  ],
  providers: [ScheduleServiceService]
})
export class ScheduleServiceModule {}
