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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ReturnCategoryDto } from './dto/return-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Lista categorias.' })
  @Get()
  async getAllCategory(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.getAllCategory()).map(
      (category) => new ReturnCategoryDto(category),
    );
  }

  @ApiOperation({ summary: 'Busca categoria por id.' })
  @Get(':id')
  async getCategoryById(@Param('id') id: number): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(await this.categoryService.getCategoryById(id));
  }

  @ApiOperation({ summary: 'Cadastra categoria.' })
  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.categoryService.createCategory(createCategoryDto),
    );
  }

  @ApiOperation({ summary: 'Atualiza categoria.' })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.categoryService.updateCategory(id, updateCategoryDto),
    );
  }

  @ApiOperation({ summary: 'Remove categoria.' })
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoryService.deleteCategory(id);
  }
}
