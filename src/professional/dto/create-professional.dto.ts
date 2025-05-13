import { IsInt } from "class-validator";

export class CreateProfessionalDto {
    @IsInt()
    user_id: number;

    @IsInt()
    establishment_id: number;
}