import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name,
    this.email = user.email,
    this.phone = user.phone,
    this.cpf = user.cpf
  }
}