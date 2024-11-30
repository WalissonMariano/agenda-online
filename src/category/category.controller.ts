import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dto/return-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ){}

    @ApiOperation({ summary: 'Busca todas categorias.' })
    @Get()
    async getAllCategory(): Promise<ReturnCategoryDto[]>{
        return (await this.categoryService.getAllCategory()).map(
            (category) => new ReturnCategoryDto(category)
        );
    }

    @ApiOperation({ summary: 'Busca categoria por id.' })
    @Get(':id')
    async getCategoryById(
        @Param('id')
        id: number
    ): Promise<ReturnCategoryDto> {

        return new ReturnCategoryDto( await this.categoryService.getCategoryById(id));

    }

    @ApiOperation({ summary: 'Cadastra categoria.' })
    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body()
        createCategoryDto: CreateCategoryDto,
    ): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategoryDto);
    }

}
