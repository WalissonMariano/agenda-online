import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { ReturnAddressDto } from './dto/return-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { DeleteResult } from 'typeorm';
import { ApiOperation } from '@nestjs/swagger';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) {}

    @ApiOperation({ summary: 'Busca todos endereços.' })
    @Get()
    async getAllAddress(): Promise<ReturnAddressDto[]> {
        return (await this.addressService.getAllAddress()).map(
            (addresses) => new ReturnAddressDto(addresses),
        );
    }

    @ApiOperation({ summary: 'Busca endereço por id.' })
    @Get(':id/establishment')
    async getAddressIdEstablishment(
        @Param('id')
        establishmentId: number
    ): Promise<ReturnAddressDto[]> {
        return (await this.addressService.getAddressIdEstablishment(establishmentId)).map(
            (address) => new ReturnAddressDto(address)
        )
    }

    @ApiOperation({ summary: 'Cadastra endereço.' })
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto);
    }

    @ApiOperation({ summary: 'Deleta endereço.' })
    @Delete(':establishmentId')
    async deleteAddress(
        @Param('establishmentId')
        establishmentId: number
    ): Promise<DeleteResult>{
        return this.addressService.deleteAddress(establishmentId);
    }

   
}
