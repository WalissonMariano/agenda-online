import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { ReturnProfessionalDto } from './dto/return-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalService } from './professional.service';

@ApiTags('Professional')
@ApiBearerAuth()
@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @ApiOperation({ summary: 'Lista profissionais.' })
  @Get()
  async getAllProfessional(): Promise<ReturnProfessionalDto[]> {
    return (await this.professionalService.getAllProfessional()).map(
      (professional) => new ReturnProfessionalDto(professional),
    );
  }

  @ApiOperation({ summary: 'Busca profissional por id.' })
  @Get(':id')
  async getProfessionalById(
    @Param('id') id: number,
  ): Promise<ReturnProfessionalDto> {
    return new ReturnProfessionalDto(
      await this.professionalService.getProfessionalById(id),
    );
  }

  @ApiOperation({ summary: 'Cadastra profissional.' })
  @UsePipes(ValidationPipe)
  @Post()
  async createProfessional(
    @Body() createProfessionalDto: CreateProfessionalDto,
  ): Promise<ReturnProfessionalDto> {
    return new ReturnProfessionalDto(
      await this.professionalService.createProfessional(createProfessionalDto),
    );
  }

  @ApiOperation({ summary: 'Atualiza profissional.' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateProfessional(
    @Param('id') id: number,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<ReturnProfessionalDto> {
    return new ReturnProfessionalDto(
      await this.professionalService.updateProfessional(
        id,
        updateProfessionalDto,
      ),
    );
  }

  @ApiOperation({ summary: 'Remove profissional.' })
  @Delete(':id')
  async deleteProfessional(@Param('id') id: number): Promise<DeleteResult> {
    return this.professionalService.deleteProfessional(id);
  }
}
