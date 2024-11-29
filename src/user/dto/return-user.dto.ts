import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(user: UserEntity) {
    this.name = user.name,
    this.email = user.email,
    this.phone = user.phone,
    this.cpf = user.cpf
  }
}