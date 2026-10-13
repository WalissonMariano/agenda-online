import { ReturnStateDto } from '../../state/dto/return-state.dto';
import { CityEntity } from '../entities/city.entity';

export class ReturnCityDto {
  id: number;
  name: string;
  stateId: number;
  state?: ReturnStateDto;

  constructor(city: CityEntity) {
    this.id = city.id;
    this.name = city.name;
    this.stateId = city.stateId;
    this.state = city.state ? new ReturnStateDto(city.state) : undefined;
  }
}
