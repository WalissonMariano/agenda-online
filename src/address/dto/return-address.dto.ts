import { ReturnCityDto } from "src/city/dto/return-city.dto";
import { AddressEntity } from "../entities/address.entity";

export class ReturnAddressDto {
    id: number;
    street: string;
    district: string;
    number: number;
    cep: string;
    city: ReturnCityDto;

    constructor(address: AddressEntity){
        this.id = address.id;
        this.street = address.street;
        this.district = address.district;
        this.number = address.number;
        this.cep = address.cep;
        this.city = address.city ? new ReturnCityDto(address.city) : undefined;
    }

}