import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { EstablishmentEntity } from './entities/establishment.entity';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(EstablishmentEntity)
    private readonly establishmentRepository: Repository<EstablishmentEntity>,
  ) {}

  async getAllEstablishment(): Promise<EstablishmentEntity[]> {
    return this.establishmentRepository.find();
  }

  async getEstablishmentById(id: number): Promise<EstablishmentEntity> {
    const establishment = await this.establishmentRepository.findOne({
      where: { id },
    });

    if (!establishment) {
      throw new NotFoundException(`Estabelecimento ${id} não encontrado.`);
    }

    return establishment;
  }

  async createEstablishment(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<EstablishmentEntity> {
    return this.establishmentRepository.save(createEstablishmentDto);
  }

  async updateEstablishment(
    id: number,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<EstablishmentEntity> {
    const establishment = await this.getEstablishmentById(id);

    return this.establishmentRepository.save({
      ...establishment,
      ...updateEstablishmentDto,
    });
  }

  async deleteEstablishment(id: number): Promise<DeleteResult> {
    await this.getEstablishmentById(id);
    return this.establishmentRepository.delete({ id });
  }
}
