import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUserEntity } from './entities/type-user.entity';
import { TypeUserController } from './type-user.controller';
import { TypeUserService } from './type-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUserEntity])],
  controllers: [TypeUserController],
  providers: [TypeUserService],
  exports: [TypeUserService],
})
export class TypeUserModule {}
