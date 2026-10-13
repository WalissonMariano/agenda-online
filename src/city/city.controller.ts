import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { ReturnCityDto } from './dto/return-city.dto';

@ApiTags('City')
@ApiBearerAuth()
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({ summary: 'Lista cidades.' })
  @Get()
  async getAllCity(): Promise<ReturnCityDto[]> {
    return (await this.cityService.getAllCity()).map(
      (city) => new ReturnCityDto(city),
    );
  }

  @ApiOperation({ summary: 'Lista cidades por estado.' })
  @Get('state/:stateId')
  async getCityByStateId(
    @Param('stateId') stateId: number,
  ): Promise<ReturnCityDto[]> {
    return (await this.cityService.getCityByStateId(stateId)).map(
      (city) => new ReturnCityDto(city),
    );
  }

  @ApiOperation({ summary: 'Busca cidade por id.' })
  @Get(':id')
  async getCityById(@Param('id') id: number): Promise<ReturnCityDto> {
    return new ReturnCityDto(await this.cityService.getCityById(id));
  }
}
