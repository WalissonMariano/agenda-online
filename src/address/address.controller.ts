import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { ReturnAddressDto } from './dto/return-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Lista endereços.' })
  @Get()
  async getAllAddress(): Promise<ReturnAddressDto[]> {
    return (await this.addressService.getAllAddress()).map(
      (address) => new ReturnAddressDto(address),
    );
  }

  @ApiOperation({ summary: 'Busca endereços por estabelecimento.' })
  @Get('establishment/:establishmentId')
  async getAddressByEstablishmentId(
    @Param('establishmentId') establishmentId: number,
  ): Promise<ReturnAddressDto[]> {
    return (
      await this.addressService.getAddressByEstablishmentId(establishmentId)
    ).map((address) => new ReturnAddressDto(address));
  }

  @ApiOperation({ summary: 'Busca endereço por id.' })
  @Get(':id')
  async getAddressById(@Param('id') id: number): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(await this.addressService.getAddressById(id));
  }

  @ApiOperation({ summary: 'Cadastra endereço.' })
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(
      await this.addressService.createAddress(createAddressDto),
    );
  }

  @ApiOperation({ summary: 'Atualiza endereço.' })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateAddress(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(
      await this.addressService.updateAddress(id, updateAddressDto),
    );
  }

  @ApiOperation({ summary: 'Remove endereço.' })
  @Delete(':id')
  async deleteAddress(@Param('id') id: number): Promise<DeleteResult> {
    return this.addressService.deleteAddress(id);
  }
}
