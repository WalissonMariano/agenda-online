import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './entities/establishment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Establishment])
  ],
  providers: [EstablishmentService],
  controllers: [EstablishmentController],
  exports: [EstablishmentService]
})
export class EstablishmentModule {}
