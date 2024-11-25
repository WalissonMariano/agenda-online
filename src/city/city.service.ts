import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
    
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) {}

    async getAllCity(): Promise<City[]> {
        return this.cityRepository.find();
    }
        
}
