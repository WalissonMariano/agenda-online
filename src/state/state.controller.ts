import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './entities/state.entity';
import { ReturnStateDto } from './dto/return-sate.dto';

@Controller('state')
export class StateController {
    constructor(
        private readonly stateService: StateService,
    ) {};

    @Get()
    async getAllState(): Promise<ReturnStateDto[]> {
        return (await this.stateService.getAllState()).map(
            (states) => new ReturnStateDto(states),
        );
    }

}
