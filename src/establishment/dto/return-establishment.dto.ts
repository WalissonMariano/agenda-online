import { Establishment } from "../entities/establishment.entity";

export class ReturnEstablishmentDto {
    name: string;
    phone: string;
    email: string;

    constructor(establishment: Establishment){
        this.name = establishment.name;
        this.phone = establishment.phone;
        this.email = establishment.email;
    }

}