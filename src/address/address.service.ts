import { Injectable } from '@nestjs/common';
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
}
