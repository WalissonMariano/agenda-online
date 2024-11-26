import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { ReturnEstablishmentDto } from './dto/return-establishment.dto';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { Establishment } from './entities/establishment.entity';
import { DeleteResult } from 'typeorm';

@Controller('establishment')
export class EstablishmentController {
    constructor(
        private readonly establishmentService: EstablishmentService,
    ){}

    @Get()
    async getAllEstablishments(): Promise<ReturnEstablishmentDto[]> {
        return (await this.establishmentService.getAllEstablishmentst()).map(
            (establishments) => new ReturnEstablishmentDto(establishments)
        )
    }

    @Get(':id')
    async getEstablishmentstById(
        @Param('id')
        id: number,
    ): Promise<ReturnEstablishmentDto> {
        return new ReturnEstablishmentDto(await this.establishmentService.getEstablishmentstById(id));
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createEstablishment(
        @Body()
        createEstablishmentDto: CreateEstablishmentDto,
    ): Promise<Establishment> {
        return this.establishmentService.createEstablishment(createEstablishmentDto);
    }

    @Delete(':id')
    async deleteEstablishnebt(
        @Param('id')
        id: number
    ): Promise<DeleteResult> {
        return this.establishmentService.deleteEstablishnebt(id);
    }


}
