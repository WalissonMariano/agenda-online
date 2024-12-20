import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { ProductServiceEntity } from './entities/product-service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductServiceService {
    constructor(
        @InjectRepository(ProductServiceEntity)
        private readonly productServiceRepository: Repository<ProductServiceEntity>,
        private readonly categoryService: CategoryService,
    ){}

    async getAllProductService(): Promise<ProductServiceEntity[]> {
        const productService = await this.productServiceRepository.find();

        if(!productService || productService.length === 0) {
            throw new NotFoundException(`Not found productService.`);
        }

        return productService;
    }

    async getProductServiceById(
        id: number
    ): Promise<ProductServiceEntity> {
        const productService = await this.productServiceRepository.findOne({
            where: {
                id
            }
        })

        if(!productService) {
            throw new NotFoundException(`Not found productService id ${id}.`)
        }

        return productService;

    } 

    async getProductServiceByName(
        name: string
    ): Promise<ProductServiceEntity> {
        const productService = await this.productServiceRepository.findOne({
            where: {
                name
            }
        })

        if(!productService) {
            throw new NotFoundException(`Not found productService name ${name}.`)
        }

        return productService;

    }

    async createProductService(
        createProductServiceDto: CreateProductServiceDto
    ): Promise<ProductServiceEntity> {

        await this.categoryService.getCategoryById(createProductServiceDto.categoryId);

        const productService = await this.getProductServiceByName(createProductServiceDto.name).catch(
            () => undefined,
        );

        if(productService) {
            throw new BadRequestException(
                `ProductService name ${createProductServiceDto.name} exist`,
            );
        }

        return  this.productServiceRepository.save(createProductServiceDto);
    }

    async deleteProductService(
        id: number
    ): Promise<DeleteResult> {
        await this.getProductServiceById(id);

        return this.productServiceRepository.delete({id});
    }


}
