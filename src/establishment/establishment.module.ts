import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentEntity } from './entities/establishment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EstablishmentEntity])
  ],
  providers: [EstablishmentService],
  controllers: [EstablishmentController],
  exports: [EstablishmentService]
})
export class EstablishmentModule {}
