import { IsString } from "class-validator";

export class Establishment {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

}