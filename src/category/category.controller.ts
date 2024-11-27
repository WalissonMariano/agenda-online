import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dto/return-category.dto';

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
}
