import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstablishmentService {
    constructor(
        @InjectRepository(Establishment)
        private readonly establishmentRepository: Repository<Establishment>
    ){}

    async getAllEstablishmentst(): Promise<Establishment[]> {
        return this.establishmentRepository.find();
    }
}
