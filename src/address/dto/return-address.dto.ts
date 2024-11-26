import { Address } from "../entities/address.entity";

export class ReturnAddressDto {
    street: string;
    district: string;
    number: number;
    cep: string;

    constructor(address: Address){
        this.street = address.street;
        this.district = address.district;
        this.number = address.number;
        this.cep = address.cep;
    }

}