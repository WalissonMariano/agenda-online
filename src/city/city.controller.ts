import { Controller, Get } from '@nestjs/common';
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
        
}
