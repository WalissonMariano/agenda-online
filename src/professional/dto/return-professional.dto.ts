import { ReturnEstablishmentDto } from '../../establishment/dto/return-establishment.dto';
import { ReturnUserDto } from '../../user/dto/return-user.dto';
import { ProfessionalEntity } from '../entities/professional.entity';

export class ReturnProfessionalDto {
  id: number;
  userId: number;
  establishmentId: number;
  user?: ReturnUserDto;
  establishment?: ReturnEstablishmentDto;

  constructor(professional: ProfessionalEntity) {
    this.id = professional.id;
    this.userId = professional.userId;
    this.establishmentId = professional.establishmentId;
    this.user = professional.user
      ? new ReturnUserDto(professional.user)
      : undefined;
    this.establishment = professional.establishment
      ? new ReturnEstablishmentDto(professional.establishment)
      : undefined;
  }
}
