import { Category } from "../entities/category.entity";

export class ReturnCategoryDto {
    name: string;

    constructor(category: Category){
        this.name = category.name;
    }

}