import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { ProfessionalEntity } from './entities/professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfessionalDto } from './dto/create-professional.dto';

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectRepository(ProfessionalEntity)
        private readonly professionalRepository: Repository<ProfessionalEntity>,
    ) {}

    async getAllProfessional(): Promise<ProfessionalEntity[]> {
        const professional = await this.professionalRepository.find();

        if(!professional ||  professional.length === 0) {
            throw new NotFoundException(`Not found professional.`);
        }

        return professional;
    }

    async getProfessionalById(
        id: number,
    ): Promise<ProfessionalEntity> {
        const professional = await this.professionalRepository.findOne({
            where: {
                id
            }
        });

        if(!professional) {
            throw new NotFoundException(`Not found professional with id ${id}`);
        }

        return professional
    }

    async createProfessional(
        createProfessionalDto: CreateProfessionalDto
    ): Promise<ProfessionalEntity> {
        return this.professionalRepository.save(createProfessionalDto);
    }

    async deleteProfessional(
        id: number,
    ): Promise<DeleteResult> {
        await this.getProfessionalById(id);
        
        return this.professionalRepository.delete({id});
    }

}
