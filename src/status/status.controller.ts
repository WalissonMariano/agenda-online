import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnStatusDto } from './dto/return-status.dto';
import { StatusService } from './status.service';

@ApiTags('Status')
@ApiBearerAuth()
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Lista status.' })
  @Get()
  async getAllStatus(): Promise<ReturnStatusDto[]> {
    return (await this.statusService.getAllStatus()).map(
      (status) => new ReturnStatusDto(status),
    );
  }

  @ApiOperation({ summary: 'Busca status por id.' })
  @Get(':id')
  async getStatusById(@Param('id') id: number): Promise<ReturnStatusDto> {
    return new ReturnStatusDto(await this.statusService.getStatusById(id));
  }
}
