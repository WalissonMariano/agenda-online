import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { ReturnProductServiceDto } from './dto/return-product-service.dto';
import { UpdateProductServiceDto } from './dto/update-product-service.dto';
import { ProductServiceService } from './product-service.service';

@ApiTags('ProductService')
@ApiBearerAuth()
@Controller('product-service')
export class ProductServiceController {
  constructor(
    private readonly productServiceService: ProductServiceService,
  ) {}

  @ApiOperation({ summary: 'Lista produtos/serviços.' })
  @Get()
  async getAllProductService(): Promise<ReturnProductServiceDto[]> {
    return (await this.productServiceService.getAllProductService()).map(
      (productService) => new ReturnProductServiceDto(productService),
    );
  }

  @ApiOperation({ summary: 'Busca produto/serviço por id.' })
  @Get(':id')
  async getProductServiceById(
    @Param('id') id: number,
  ): Promise<ReturnProductServiceDto> {
    return new ReturnProductServiceDto(
      await this.productServiceService.getProductServiceById(id),
    );
  }

  @ApiOperation({ summary: 'Cadastra produto/serviço.' })
  @Post()
  @UsePipes(ValidationPipe)
  async createProductService(
    @Body() createProductServiceDto: CreateProductServiceDto,
  ): Promise<ReturnProductServiceDto> {
    return new ReturnProductServiceDto(
      await this.productServiceService.createProductService(
        createProductServiceDto,
      ),
    );
  }

  @ApiOperation({ summary: 'Atualiza produto/serviço.' })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateProductService(
    @Param('id') id: number,
    @Body() updateProductServiceDto: UpdateProductServiceDto,
  ): Promise<ReturnProductServiceDto> {
    return new ReturnProductServiceDto(
      await this.productServiceService.updateProductService(
        id,
        updateProductServiceDto,
      ),
    );
  }

  @ApiOperation({ summary: 'Remove produto/serviço.' })
  @Delete(':id')
  async deleteProductService(@Param('id') id: number): Promise<DeleteResult> {
    return this.productServiceService.deleteProductService(id);
  }
}
