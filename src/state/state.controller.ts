import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { ReturnStateDto } from './dto/return-state.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('state')
export class StateController {
    constructor(
        private readonly stateService: StateService,
    ) {};

    @ApiOperation({ summary: 'Busca todos estados.' })
    @Get()
    async getAllState(): Promise<ReturnStateDto[]> {
        return (await this.stateService.getAllState()).map(
            (states) => new ReturnStateDto(states),
        );
    }

}
