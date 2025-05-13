import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ReturnProfessionalDto } from './dto/return-professional.dto';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { ProfessionalEntity } from './entities/professional.entity';
import { DeleteResult } from 'typeorm';

@Controller('professional')
export class ProfessionalController {
    constructor(
        private readonly professionalService: ProfessionalService,
    ) {}

    @Get()
    async getAllProfessional(): Promise<ReturnProfessionalDto[]> {
        return (await this.professionalService.getAllProfessional()).map(
            (professional) => new ReturnProfessionalDto(professional)
        );
    }

    @Post()
    async createProfessional(
        @Body()
        createProfessionalDto: CreateProfessionalDto
    ): Promise<ProfessionalEntity> {
        return this.professionalService.createProfessional(createProfessionalDto);
    }

    @Delete(':id')
    async deleteProfessional(
        @Param('id')
        id: number,
    ): Promise<DeleteResult> {
        return this.professionalService.deleteProfessional(id);
    }
}
