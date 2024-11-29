import { forwardRef, Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from 'src/state/entities/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    forwardRef(() => StateEntity)],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule {}
