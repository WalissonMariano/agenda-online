import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ){}

    async getAllStatus(): Promise<Status[]> {
        const status = await this.statusRepository.find();

        if(!status) {
            throw new NotFoundException(`Not found status.`)
        }

        return status;
    }

    async getStatusById(id: number): Promise<Status> {
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
