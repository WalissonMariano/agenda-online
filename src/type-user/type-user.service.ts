import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeUserEntity } from './entities/type-user.entity';

@Injectable()
export class TypeUserService {
  constructor(
    @InjectRepository(TypeUserEntity)
    private readonly typeUserRepository: Repository<TypeUserEntity>,
  ) {}

  async getAllTypeUser(): Promise<TypeUserEntity[]> {
    return this.typeUserRepository.find();
  }

  async getTypeUserById(id: number): Promise<TypeUserEntity> {
    const typeUser = await this.typeUserRepository.findOne({ where: { id } });

    if (!typeUser) {
      throw new NotFoundException(`Tipo de usuário ${id} não encontrado.`);
    }

    return typeUser;
  }
}
