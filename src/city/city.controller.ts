import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './entities/city.entity';

@Controller('city')
export class CityController {
    
    constructor(
        private readonly cityService: CityService,
    ) {}

    @Get()
    async getAllCity(): Promise<City[]> {
        return this.cityService.getAllCity();
    }

    @Get(':id')
    async getCityByStateId(
        @Param('id') 
        stateId: number
    ): Promise<City[]> {
        return this.cityService.getCityByStateId(stateId);
    }
        
}
