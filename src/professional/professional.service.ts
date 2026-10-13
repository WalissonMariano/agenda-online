import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EstablishmentService } from '../establishment/establishment.service';
import { UserService } from '../user/user.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalEntity } from './entities/professional.entity';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(ProfessionalEntity)
    private readonly professionalRepository: Repository<ProfessionalEntity>,
    private readonly userService: UserService,
    private readonly establishmentService: EstablishmentService,
  ) {}

  async getAllProfessional(): Promise<ProfessionalEntity[]> {
    return this.professionalRepository.find();
  }

  async getProfessionalById(id: number): Promise<ProfessionalEntity> {
    const professional = await this.professionalRepository.findOne({
      where: { id },
    });

    if (!professional) {
      throw new NotFoundException(`Profissional ${id} não encontrado.`);
    }

    return professional;
  }

  async createProfessional(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<ProfessionalEntity> {
    await this.userService.getUserById(createProfessionalDto.userId);
    await this.establishmentService.getEstablishmentById(
      createProfessionalDto.establishmentId,
    );

    return this.professionalRepository.save(createProfessionalDto);
  }

  async updateProfessional(
    id: number,
    updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<ProfessionalEntity> {
    const professional = await this.getProfessionalById(id);

    if (updateProfessionalDto.userId) {
      await this.userService.getUserById(updateProfessionalDto.userId);
    }

    if (updateProfessionalDto.establishmentId) {
      await this.establishmentService.getEstablishmentById(
        updateProfessionalDto.establishmentId,
      );
    }

    return this.professionalRepository.save({
      ...professional,
      ...updateProfessionalDto,
    });
  }

  async deleteProfessional(id: number): Promise<DeleteResult> {
    await this.getProfessionalById(id);
    return this.professionalRepository.delete({ id });
  }
}
