import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { EstablishmentModule } from 'src/establishment/establishment.module';
import { StatusModule } from 'src/status/status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    UserModule,
    EstablishmentModule,
    StatusModule
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
