import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { ProductServiceEntity } from './entities/product-service.entity';
import { ProductServiceController } from './product-service.controller';
import { ProductServiceService } from './product-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductServiceEntity]),
    CategoryModule,
  ],
  providers: [ProductServiceService],
  controllers: [ProductServiceController],
  exports: [ProductServiceService],
})
export class ProductServiceModule {}
