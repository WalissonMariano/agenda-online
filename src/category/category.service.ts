import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

    async getAllCategory(): Promise<CategoryEntity[]> {
        const category = this.categoryRepository.find();

        if(!category) {
            throw new NotFoundException(`Not found category`);
        }

        return category;
    }

    async getCategoryById(id: number): Promise<CategoryEntity> {
        
        const category = await this.categoryRepository.findOne({
            where: {
                id
            }
        });
        
        if(!category) {
            throw new NotFoundException(`Not found category id ${id}`);
        }

        return category

    }

    async getCategoryByName(name: string): Promise<CategoryEntity>{
        const category = this.categoryRepository.findOne({
            where: {
                name
            }
        })

        if(!category) {

            throw new NotFoundException(`Not found category name ${name}`);

        }

        return category;
    }

    async createCategory(
        createCategoryDto: CreateCategoryDto
    ): Promise<CategoryEntity> {

        const category = await this.getCategoryByName(createCategoryDto.name).catch(
            () => undefined,
        );

        if(category) {
            throw new BadRequestException(
                `Category name ${createCategoryDto.name} exist`,
            );
        }

        return this.categoryRepository.save(createCategoryDto);

    }
}
