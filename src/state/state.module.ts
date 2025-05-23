import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StateEntity]),
    StateModule
  ],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService]
})
export class StateModule {}
