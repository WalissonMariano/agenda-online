import { forwardRef, Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { City } from 'src/city/entities/city.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { CityModule } from 'src/city/city.module';
import { EstablishmentModule } from 'src/establishment/establishment.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Address]),
    CityModule,
    EstablishmentModule,
  ],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
