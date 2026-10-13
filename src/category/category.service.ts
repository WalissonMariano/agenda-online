import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Categoria ${id} não encontrada.`);
    }

    return category;
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });

    if (!category) {
      throw new NotFoundException(`Categoria ${name} não encontrada.`);
    }

    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.getCategoryByName(createCategoryDto.name).catch(
      () => undefined,
    );

    if (category) {
      throw new ConflictException(
        `Categoria ${createCategoryDto.name} já existe.`,
      );
    }

    return this.categoryRepository.save(createCategoryDto);
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.getCategoryById(id);

    return this.categoryRepository.save({
      ...category,
      ...updateCategoryDto,
    });
  }

  async deleteCategory(id: number): Promise<DeleteResult> {
    await this.getCategoryById(id);
    return this.categoryRepository.delete({ id });
  }
}
