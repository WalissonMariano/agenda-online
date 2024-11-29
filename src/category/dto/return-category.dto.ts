import { CategoryEntity } from "../entities/category.entity";

export class ReturnCategoryDto {
    name: string;

    constructor(category: CategoryEntity){
        this.name = category.name;
    }

}