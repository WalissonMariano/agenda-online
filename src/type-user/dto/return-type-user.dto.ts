import { TypeUserEntity } from '../entities/type-user.entity';

export class ReturnTypeUserDto {
  id: number;
  name: string;

  constructor(typeUser: TypeUserEntity) {
    this.id = typeUser.id;
    this.name = typeUser.name;
  }
}
