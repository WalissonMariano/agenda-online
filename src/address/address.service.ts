import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CityService } from '../city/city.service';
import { EstablishmentService } from '../establishment/establishment.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';

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

  async getAddressById(id: number): Promise<AddressEntity> {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Endereço ${id} não encontrado.`);
    }

    return address;
  }

  async getAddressByEstablishmentId(
    establishmentId: number,
  ): Promise<AddressEntity[]> {
    return this.addressRepository.find({
      where: { establishmentId },
    });
  }

  async createAddress(
    createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    await this.establishmentService.getEstablishmentById(
      createAddressDto.establishmentId,
    );
    await this.cityService.getCityById(createAddressDto.cityId);

    return this.addressRepository.save(createAddressDto);
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    const address = await this.getAddressById(id);

    if (updateAddressDto.establishmentId) {
      await this.establishmentService.getEstablishmentById(
        updateAddressDto.establishmentId,
      );
    }

    if (updateAddressDto.cityId) {
      await this.cityService.getCityById(updateAddressDto.cityId);
    }

    return this.addressRepository.save({
      ...address,
      ...updateAddressDto,
    });
  }

  async deleteAddress(id: number): Promise<DeleteResult> {
    await this.getAddressById(id);
    return this.addressRepository.delete({ id });
  }
}
