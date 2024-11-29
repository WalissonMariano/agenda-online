import { IsNumber, IsString } from "class-validator";

export class CreateProductServiceDto {

    @IsString()
    name: string;

    @IsString()
    time: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @IsNumber()
    categoryId: number;

}