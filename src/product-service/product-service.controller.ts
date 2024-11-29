import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { ReturnProductServiceDto } from './dto/return-product-service.dto';
import { ProductService } from './entities/product-service.entity';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { DeleteResult } from 'typeorm';

@Controller('product-service')
export class ProductServiceController {
    constructor(
        private readonly productServiceService: ProductServiceService,
    ) {}

    @Get()
    async getAllProductService(): Promise<ReturnProductServiceDto[]> {
        return (await this.productServiceService.getAllProductService()).map(
            (productService) => new ReturnProductServiceDto(productService)
        );
    }

    @Get(':id')
    async getProductServiceById(
        @Param('id')
        id: number
    ): Promise<ReturnProductServiceDto> {
        return new ReturnProductServiceDto(await this.productServiceService.getProductServiceById(id));
    }

    @Post()
    async createProductService(
        @Body()
        createProductServiceDto: CreateProductServiceDto
    ): Promise<ProductService> {
        return this.productServiceService.createProductService(createProductServiceDto);
    }

    @Delete(':id')
    async deleteSchedule(
        @Param('id')
        id: number
    ): Promise<DeleteResult> {
        return this.productServiceService.deleteProductService(id);
    }
}
