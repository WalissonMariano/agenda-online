import { Controller, Get, Param, Post } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { AddressService } from './address.service';
import { ReturnAddressDto } from './dto/return-address.dto';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) {}

    @Get()
    async getAllAddress(): Promise<ReturnAddressDto[]> {
        return (await this.addressService.getAllAddress()).map(
            (addresses) => new ReturnAddressDto(addresses),
        );
    }

    @Get(':id/establishment')
    async getAddressIdEstablishment(
        @Param('id')
        establishmentId: number
    ): Promise<ReturnAddressDto[]> {
        return (await this.addressService.getAddressIdEstablishment(establishmentId)).map(
            (address) => new ReturnAddressDto(address)
        )
    }
/*
    @Post()
    async createAddress(): Promise<>
    */
}
