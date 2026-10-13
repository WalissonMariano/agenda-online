import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { UpdateProductServiceDto } from './dto/update-product-service.dto';
import { ProductServiceEntity } from './entities/product-service.entity';

@Injectable()
export class ProductServiceService {
  constructor(
    @InjectRepository(ProductServiceEntity)
    private readonly productServiceRepository: Repository<ProductServiceEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAllProductService(): Promise<ProductServiceEntity[]> {
    return this.productServiceRepository.find();
  }

  async getProductServiceById(id: number): Promise<ProductServiceEntity> {
    const productService = await this.productServiceRepository.findOne({
      where: { id },
    });

    if (!productService) {
      throw new NotFoundException(`Produto/serviço ${id} não encontrado.`);
    }

    return productService;
  }

  async getProductServiceByName(name: string): Promise<ProductServiceEntity> {
    const productService = await this.productServiceRepository.findOne({
      where: { name },
    });

    if (!productService) {
      throw new NotFoundException(`Produto/serviço ${name} não encontrado.`);
    }

    return productService;
  }

  async createProductService(
    createProductServiceDto: CreateProductServiceDto,
  ): Promise<ProductServiceEntity> {
    await this.categoryService.getCategoryById(
      createProductServiceDto.categoryId,
    );

    const productService = await this.getProductServiceByName(
      createProductServiceDto.name,
    ).catch(() => undefined);

    if (productService) {
      throw new ConflictException(
        `Produto/serviço ${createProductServiceDto.name} já existe.`,
      );
    }

    return this.productServiceRepository.save(createProductServiceDto);
  }

  async updateProductService(
    id: number,
    updateProductServiceDto: UpdateProductServiceDto,
  ): Promise<ProductServiceEntity> {
    const productService = await this.getProductServiceById(id);

    if (updateProductServiceDto.categoryId) {
      await this.categoryService.getCategoryById(
        updateProductServiceDto.categoryId,
      );
    }

    return this.productServiceRepository.save({
      ...productService,
      ...updateProductServiceDto,
    });
  }

  async deleteProductService(id: number): Promise<DeleteResult> {
    await this.getProductServiceById(id);
    return this.productServiceRepository.delete({ id });
  }
}
