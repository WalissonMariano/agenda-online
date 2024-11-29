import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { EstablishmentEntity } from './entities/establishment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';

@Injectable()
export class EstablishmentService {
    constructor(
        @InjectRepository(EstablishmentEntity)
        private readonly establishmentRepository: Repository<EstablishmentEntity>
    ){}

    async getAllEstablishmentst(): Promise<EstablishmentEntity[]> {
        return this.establishmentRepository.find();
    }

    async getEstablishmentstById(id: number): Promise<EstablishmentEntity> {
        
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
    ): Promise<EstablishmentEntity> {
        return this.establishmentRepository.save({
            ...createEstablishmentDto,
        })
    }

    async deleteEstablishnebt(id: number): Promise<DeleteResult> {
        await this.getEstablishmentstById(id);

        return this.establishmentRepository.delete({id});
    }
}
