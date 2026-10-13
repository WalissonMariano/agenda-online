import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusEntity } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(StatusEntity)
    private readonly statusRepository: Repository<StatusEntity>,
  ) {}

  async getAllStatus(): Promise<StatusEntity[]> {
    return this.statusRepository.find();
  }

  async getStatusById(id: number): Promise<StatusEntity> {
    const status = await this.statusRepository.findOne({
      where: { id },
    });

    if (!status) {
      throw new NotFoundException(`Status ${id} não encontrado.`);
    }

    return status;
  }
}
