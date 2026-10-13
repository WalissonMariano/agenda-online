import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentModule } from '../establishment/establishment.module';
import { UserModule } from '../user/user.module';
import { ProfessionalEntity } from './entities/professional.entity';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessionalEntity]),
    UserModule,
    EstablishmentModule,
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
