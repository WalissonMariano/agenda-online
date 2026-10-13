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
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { ReturnEstablishmentDto } from './dto/return-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { EstablishmentService } from './establishment.service';

@ApiTags('Establishment')
@ApiBearerAuth()
@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @ApiOperation({ summary: 'Lista estabelecimentos.' })
  @Get()
  async getAllEstablishment(): Promise<ReturnEstablishmentDto[]> {
    return (await this.establishmentService.getAllEstablishment()).map(
      (establishment) => new ReturnEstablishmentDto(establishment),
    );
  }

  @ApiOperation({ summary: 'Busca estabelecimento por id.' })
  @Get(':id')
  async getEstablishmentById(
    @Param('id') id: number,
  ): Promise<ReturnEstablishmentDto> {
    return new ReturnEstablishmentDto(
      await this.establishmentService.getEstablishmentById(id),
    );
  }

  @ApiOperation({ summary: 'Cadastra estabelecimento.' })
  @Post()
  @UsePipes(ValidationPipe)
  async createEstablishment(
    @Body() createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<ReturnEstablishmentDto> {
    return new ReturnEstablishmentDto(
      await this.establishmentService.createEstablishment(
        createEstablishmentDto,
      ),
    );
  }

  @ApiOperation({ summary: 'Atualiza estabelecimento.' })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateEstablishment(
    @Param('id') id: number,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<ReturnEstablishmentDto> {
    return new ReturnEstablishmentDto(
      await this.establishmentService.updateEstablishment(
        id,
        updateEstablishmentDto,
      ),
    );
  }

  @ApiOperation({ summary: 'Remove estabelecimento.' })
  @Delete(':id')
  async deleteEstablishment(@Param('id') id: number): Promise<DeleteResult> {
    return this.establishmentService.deleteEstablishment(id);
  }
}
