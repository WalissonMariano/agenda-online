import { ReturnCategoryDto } from "src/category/dto/return-category.dto";
import { ProductServiceEntity } from "../entities/product-service.entity";

export class ReturnProductServiceDto {
    id: number;
    name: string;
    time: string;
    price: number;
    image: string;
    category: ReturnCategoryDto;

    constructor(
        productService: ProductServiceEntity
    ){
        this.id = productService.id;
        this.name = productService.name;
        this.time = productService.time;
        this.price = productService.price;
        this.image = productService.image;
        this.category = productService.category ? new ReturnCategoryDto(productService.category) : undefined;
    }
}