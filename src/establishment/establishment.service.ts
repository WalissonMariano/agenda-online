import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';

@Injectable()
export class EstablishmentService {
    constructor(
        @InjectRepository(Establishment)
        private readonly establishmentRepository: Repository<Establishment>
    ){}

    async getAllEstablishmentst(): Promise<Establishment[]> {
        return this.establishmentRepository.find();
    }

    async getEstablishmentstById(id: number): Promise<Establishment> {
        
        const establishment = await this.establishmentRepository.findOne({
            where: {
                id
            }
        });
        
        if(!establishment) {
            throw new NotFoundException(`Not found establishment id ${id}`);
        }

        return establishment;
    }

    async createEstablishment(
        createEstablishmentDto: CreateEstablishmentDto
    ): Promise<Establishment> {
        return this.establishmentRepository.save({
            ...createEstablishmentDto,
        })
    }

    async deleteEstablishnebt(id: number): Promise<DeleteResult> {
        await this.getEstablishmentstById(id);

        return this.establishmentRepository.delete({id});
    }
}
