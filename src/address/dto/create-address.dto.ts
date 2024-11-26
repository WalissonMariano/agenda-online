import { IsInt, IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity({name: 'address'})
export class Address {

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

}