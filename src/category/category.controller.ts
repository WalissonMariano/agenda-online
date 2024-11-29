import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dto/return-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ){}

    @Get()
    async getAllCategory(): Promise<ReturnCategoryDto[]>{
        return (await this.categoryService.getAllCategory()).map(
            (category) => new ReturnCategoryDto(category)
        );
    }

    @Get(':id')
    async getCategoryById(
        @Param('id')
        id: number
    ): Promise<ReturnCategoryDto> {

        return new ReturnCategoryDto( await this.categoryService.getCategoryById(id));

    }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body()
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.createCategory(createCategoryDto);
    }

}
