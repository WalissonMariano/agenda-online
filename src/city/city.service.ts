import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getCityById(id: number): Promise<City> {
        const city = await this.cityRepository.findOne({
            where: {
                id
            }
        });

        if(!city) {
            throw new NotFoundException(`City id ${id} not found`)
        }

        return city;
    }

    async getCityByStateId(stateId: number): Promise<City[]>{
        const cities = await this.cityRepository.find({
            where: {
                stateId
            }
        });

        if(!cities) {
            throw new NotFoundException(`Not found cities for stateId ${stateId}`)
        }

        return cities;
        
    }
        
}
