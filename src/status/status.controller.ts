import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { ReturnStateDto } from 'src/state/dto/return-state.dto';
import { ReturnStatusDto } from './dto/return-status.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('status')
export class StatusController {
    constructor(
        private readonly statusService: StatusService,
    ){}

    @ApiOperation({ summary: 'Busca todos status.' })
    @Get()
    async getAllStatus(): Promise<ReturnStateDto[]> {
        return (await this.statusService.getAllStatus()).map(
            (status) => new ReturnStatusDto(status)
        );
    }
}
