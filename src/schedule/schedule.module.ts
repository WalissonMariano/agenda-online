import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentModule } from '../establishment/establishment.module';
import { ProductServiceModule } from '../product-service/product-service.module';
import { ProfessionalModule } from '../professional/professional.module';
import { StatusModule } from '../status/status.module';
import { UserModule } from '../user/user.module';
import { ScheduleEntity } from './entities/schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEntity]),
    UserModule,
    EstablishmentModule,
    StatusModule,
    ProfessionalModule,
    ProductServiceModule,
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
