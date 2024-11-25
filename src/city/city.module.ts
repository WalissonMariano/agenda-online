import { forwardRef, Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from 'src/state/entities/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    forwardRef(() => State)],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule {}
