import { TypeUserEntity } from "../entities/type-user.entity";

export class ReturnTypeUserDto {
    name: string;

    constructor(typeUser: TypeUserEntity) {
        this.name = typeUser.name
    }
}