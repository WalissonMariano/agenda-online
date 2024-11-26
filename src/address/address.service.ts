import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
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
}
