import { Category } from "../entities/category.entity";

export class ReturnCategoryDto {
    name: string;
    description: string;

    constructor(category: Category){
        this.name = category.name;
        this.description = category.description;
    }

}