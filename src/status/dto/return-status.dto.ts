import { Status } from "../entities/status.entitiy";

export class ReturnStatusDto {
    name: string;
    description: string;

    constructor(status: Status){
        this.name = status.name;
        this.description = status.description;
    }

}