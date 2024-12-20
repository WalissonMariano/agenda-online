import { ReturnAddressDto } from "src/address/dto/return-address.dto";
import { EstablishmentEntity } from "../entities/establishment.entity";

export class ReturnEstablishmentDto {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: ReturnAddressDto;

    constructor(establishment: EstablishmentEntity){
        this.id = establishment.id;
        this.name = establishment.name;
        this.phone = establishment.phone;
        this.email = establishment.email;
        this.address = establishment.address ? new ReturnAddressDto(establishment.address) : undefined;
    }

}