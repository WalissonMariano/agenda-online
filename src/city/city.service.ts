import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
    
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
    ) {}

    async getAllCity(): Promise<CityEntity[]> {
        return this.cityRepository.find();
    }

    async getCityById(id: number): Promise<CityEntity> {
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

    async getCityByStateId(stateId: number): Promise<CityEntity[]>{
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
