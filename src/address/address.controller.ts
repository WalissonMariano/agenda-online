import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { AddressService } from './address.service';
import { ReturnAddressDto } from './dto/return-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UserId } from 'src/decorators/user-id.decorator';

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

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
    ): Promise<Address> {
        return this.addressService.createAddress(createAddressDto);
    }
   
}