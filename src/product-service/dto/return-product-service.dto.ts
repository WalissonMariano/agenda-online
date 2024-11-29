import { ReturnCategoryDto } from "src/category/dto/return-category.dto";
import { ProductService } from "../entities/product-service.entity";

export class ReturnProductServiceDto {

    name: string;
    time: string;
    price: number;
    image: string;
    category: ReturnCategoryDto;

    constructor(
        productService: ProductService
    ){
        this.name = productService.name;
        this.time = productService.time;
        this.price = productService.price;
        this.image = productService.image;
        this.category = productService.category ? new ReturnCategoryDto(productService.category) : undefined;
    }
}