import { StatusEntity } from "../entities/status.entity";

export class ReturnStatusDto {
    name: string;

    constructor(status: StatusEntity){
        this.name = status.name;
    }

}