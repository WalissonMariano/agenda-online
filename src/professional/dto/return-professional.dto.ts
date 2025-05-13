import { ProfessionalEntity } from "../entities/professional.entity";

export class ReturnProfessionalDto {
    user_id: number;
    establishment_id: number;

    constructor(professional: ProfessionalEntity) {
        this.user_id = professional.user_id;
        this.establishment_id = professional.establishment_id;
    }
}