import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { ReturnCityDto } from './dto/return-city.dto';

@Controller('city')
export class CityController {
    
    constructor(
        private readonly cityService: CityService,
    ) {}

    @Get()
    async getAllCity(): Promise<ReturnCityDto[]> {
        return (await this.cityService.getAllCity()).map(
            (cities) => new ReturnCityDto(cities),
        );
    }

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
