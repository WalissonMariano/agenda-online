import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { ReturnEstablishmentDto } from './dto/return-establishment.dto';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { EstablishmentEntity } from './entities/establishment.entity';
import { DeleteResult } from 'typeorm';
import { ApiOperation } from '@nestjs/swagger';

@Controller('establishment')
export class EstablishmentController {
    constructor(
        private readonly establishmentService: EstablishmentService,
    ){}

    @ApiOperation({ summary: 'Busca todos estabelecimentos.' })
    @Get()
    async getAllEstablishments(): Promise<ReturnEstablishmentDto[]> {
        return (await this.establishmentService.getAllEstablishmentst()).map(
            (establishments) => new ReturnEstablishmentDto(establishments)
        )
    }

    @ApiOperation({ summary: 'Busca estabelecimento por id.' })
    @Get(':id')
    async getEstablishmentstById(
        @Param('id')
        id: number,
    ): Promise<ReturnEstablishmentDto> {
        return new ReturnEstablishmentDto(await this.establishmentService.getEstablishmentstById(id));
    }

    @ApiOperation({ summary: 'Cadastra estabelecimento.' })
    @Post()
    @UsePipes(ValidationPipe)
    async createEstablishment(
        @Body()
        createEstablishmentDto: CreateEstablishmentDto,
    ): Promise<EstablishmentEntity> {
        return this.establishmentService.createEstablishment(createEstablishmentDto);
    }

    @ApiOperation({ summary: 'Deleta estabelecimento.' })
    @Delete(':id')
    async deleteEstablishnebt(
        @Param('id')
        id: number
    ): Promise<DeleteResult> {
        return this.establishmentService.deleteEstablishnebt(id);
    }


}
