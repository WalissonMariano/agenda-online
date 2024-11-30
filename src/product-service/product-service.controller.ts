import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { ReturnProductServiceDto } from './dto/return-product-service.dto';
import { ProductServiceEntity } from './entities/product-service.entity';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { DeleteResult } from 'typeorm';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product-service')
export class ProductServiceController {
    constructor(
        private readonly productServiceService: ProductServiceService,
    ) {}

    @ApiOperation({ summary: 'Busca todos serviços.' })
    @Get()
    async getAllProductService(): Promise<ReturnProductServiceDto[]> {
        return (await this.productServiceService.getAllProductService()).map(
            (productService) => new ReturnProductServiceDto(productService)
        );
    }

    @ApiOperation({ summary: 'Busca serviço por id.' })
    @Get(':id')
    async getProductServiceById(
        @Param('id')
        id: number
    ): Promise<ReturnProductServiceDto> {
        return new ReturnProductServiceDto(await this.productServiceService.getProductServiceById(id));
    }

    @ApiOperation({ summary: 'Cadastra serviço.' })
    @Post()
    async createProductService(
        @Body()
        createProductServiceDto: CreateProductServiceDto
    ): Promise<ProductServiceEntity> {
        return this.productServiceService.createProductService(createProductServiceDto);
    }

    @ApiOperation({ summary: 'Deleta serviços.' })
    @Delete(':id')
    async deleteSchedule(
        @Param('id')
        id: number
    ): Promise<DeleteResult> {
        return this.productServiceService.deleteProductService(id);
    }
}
