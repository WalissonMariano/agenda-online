import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnStateDto } from './dto/return-state.dto';
import { StateService } from './state.service';

@ApiTags('State')
@ApiBearerAuth()
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiOperation({ summary: 'Lista estados.' })
  @Get()
  async getAllState(): Promise<ReturnStateDto[]> {
    return (await this.stateService.getAllState()).map(
      (state) => new ReturnStateDto(state),
    );
  }

  @ApiOperation({ summary: 'Busca estado por id.' })
  @Get(':id')
  async getStateById(@Param('id') id: number): Promise<ReturnStateDto> {
    return new ReturnStateDto(await this.stateService.getStateById(id));
  }
}
