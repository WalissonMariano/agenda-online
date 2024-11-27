import { Status } from "../entities/status.entity";

export class ReturnStatusDto {
    name: string;

    constructor(status: Status){
        this.name = status.name;
    }

}