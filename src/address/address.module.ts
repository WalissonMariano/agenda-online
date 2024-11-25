import { forwardRef, Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { City } from 'src/city/entities/city.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Address]),
    forwardRef(() => City)
  ],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
