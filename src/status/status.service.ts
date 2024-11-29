import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StatusEntity } from './entities/status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(StatusEntity)
        private readonly statusRepository: Repository<StatusEntity>,
    ){}

    async getAllStatus(): Promise<StatusEntity[]> {
        const status = await this.statusRepository.find();

        if(!status) {
            throw new NotFoundException(`Not found status.`)
        }

        return status;
    }

    async getStatusById(id: number): Promise<StatusEntity> {
        const status = await this.statusRepository.findOne({
            where: {
                id
            }
        })

        if(!status) {
            throw new NotFoundException(`Not found status id ${id}`)
        }

        return status;
    }

}
