import { Module } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { ProductServiceController } from './product-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './entities/product-service.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductService]),
    CategoryModule
  ],
  providers: [ProductServiceService],
  controllers: [ProductServiceController]
})
export class ProductServiceModule {}
