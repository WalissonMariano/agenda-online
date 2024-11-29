import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        
        private readonly establishmentService: EstablishmentService,
        private readonly cityService: CityService,
    ) {}

    async getAllAddress(): Promise<AddressEntity[]> {
        return this.addressRepository.find();
    }

    async getAddressIdEstablishment(establishmentId: number): Promise<AddressEntity[]> {
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
    ): Promise<AddressEntity> {
        await this.establishmentService.getEstablishmentstById(createAddressDto.establishmentId);
        await this.cityService.getCityById(createAddressDto.cityId);

        return this.addressRepository.save({
            ...createAddressDto,
        });
    }

    async deleteAddress(
        establishmentId: number
    ): Promise<DeleteResult> {
        await this.getAddressIdEstablishment(establishmentId);

        return this.addressRepository.delete({ establishmentId })
    }
    
}
