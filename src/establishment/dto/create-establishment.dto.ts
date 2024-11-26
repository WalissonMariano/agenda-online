import { IsString } from "class-validator";

export class CreateEstablishmentDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

}