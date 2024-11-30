import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { ReturnCityDto } from './dto/return-city.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('city')
export class CityController {
    
    constructor(
        private readonly cityService: CityService,
    ) {}

    @ApiOperation({ summary: 'Busca todas cidades.' })
    @Get()
    async getAllCity(): Promise<ReturnCityDto[]> {
        return (await this.cityService.getAllCity()).map(
            (cities) => new ReturnCityDto(cities),
        );
    }

    @ApiOperation({ summary: 'Busca cidade por id do estado.' })
    @Get(':id/state')
    async getCityByStateId(
        @Param('id') 
        stateId: number
    ): Promise<ReturnCityDto[]> {
        return (await this.cityService.getCityByStateId(stateId)).map(
            (cities) => new ReturnCityDto(cities),
        );
    }
        
}
