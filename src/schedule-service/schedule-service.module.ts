import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductServiceModule } from '../product-service/product-service.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ScheduleServiceEntity } from './entities/schedule-service.entity';
import { ScheduleServiceController } from './schedule-service.controller';
import { ScheduleServiceService } from './schedule-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleServiceEntity]),
    forwardRef(() => ScheduleModule),
    ProductServiceModule,
  ],
  controllers: [ScheduleServiceController],
  providers: [ScheduleServiceService],
  exports: [ScheduleServiceService],
})
export class ScheduleServiceModule {}
