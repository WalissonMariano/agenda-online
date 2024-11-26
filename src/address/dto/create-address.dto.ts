import { IsInt, IsString } from "class-validator";

export class CreateAddressDto {

    @IsInt()
    establishmentId: number;

    @IsString()
    street: string;

    @IsString()
    district: string;

    @IsInt()
    number: number;

    @IsString()
    cep: string;

    @IsInt()
    cityId: number;

}