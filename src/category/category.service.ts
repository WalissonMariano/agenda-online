import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async getAllCategory(): Promise<Category[]> {
        const category = this.categoryRepository.find();

        if(!category) {
            throw new NotFoundException(`Not found category`);
        }

        return category;
    }

    async getCategoryById(id: number): Promise<Category> {
        const category = this.categoryRepository.findOne({
            where: {
                id
            }
        });

        if(!category) {
            throw new NotFoundException(`Not found category id ${id}`);
        }

        return category

    }
}
