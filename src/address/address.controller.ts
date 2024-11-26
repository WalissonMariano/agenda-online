import { Controller, Get, Post } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) {}

    @Get()
    async getAllAddress(): Promise<Address[]> {
        return this.addressService.getAllAddress();
    }
/*
    @Post()
    async createAddress(): Promise<>
    */
}
