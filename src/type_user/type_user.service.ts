import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeUserEntity } from './entities/type-user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeUserService {
    constructor(
        @InjectRepository(TypeUserEntity)
        private readonly typeUserRepository: Repository<TypeUserEntity>
    ) {};

    async getAllTypeUser(): Promise<TypeUserEntity[]> {
        return this.typeUserRepository.find();
    }
}
