import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async getAllState(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }

  async getStateById(id: number): Promise<StateEntity> {
    const state = await this.stateRepository.findOne({ where: { id } });

    if (!state) {
      throw new NotFoundException(`Estado ${id} não encontrado.`);
    }

    return state;
  }
}
