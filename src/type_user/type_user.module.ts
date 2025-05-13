import { Module } from '@nestjs/common';
import { TypeUserService } from './type_user.service';
import { TypeUserController } from './type_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUserEntity } from './entities/type-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeUserEntity])
  ],
  controllers: [TypeUserController],
  providers: [TypeUserService],
  exports: [TypeUserService]
})
export class TypeUserModule {}
