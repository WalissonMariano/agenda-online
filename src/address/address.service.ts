import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        
        private readonly establishmentService: EstablishmentService,
        private readonly cityService: CityService,
    ) {}

    async getAllAddress(): Promise<Address[]> {
        return this.addressRepository.find();
    }

    async getAddressIdEstablishment(establishmentId: number): Promise<Address[]> {
        const address = this.addressRepository.find({
            where: {
                establishmentId
            }
        })

        if(!address){
            throw new NotFoundException(`Not found address for establishmentId ${establishmentId}`)
        }
        
        return address;
    }

    async createAddress(
        createAddressDto: CreateAddressDto,
    ): Promise<Address> {
        await this.establishmentService.getEstablishmentstById(createAddressDto.establishmentId);
        await this.cityService.getCityById(createAddressDto.cityId);

        return this.addressRepository.save({
            ...createAddressDto,
        });
    }
    
}
