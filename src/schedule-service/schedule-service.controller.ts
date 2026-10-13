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
import { CreateScheduleServiceDto } from './dto/create-schedule-service.dto';
import { ReturnScheduleServiceDto } from './dto/return-schedule-service.dto';
import { UpdateScheduleServiceDto } from './dto/update-schedule-service.dto';
import { ScheduleServiceService } from './schedule-service.service';

@ApiTags('ScheduleService')
@ApiBearerAuth()
@Controller('schedule-service')
export class ScheduleServiceController {
  constructor(
    private readonly scheduleServiceService: ScheduleServiceService,
  ) {}

  @ApiOperation({ summary: 'Lista itens de agendamento.' })
  @Get()
  async getAllScheduleService(): Promise<ReturnScheduleServiceDto[]> {
    return (await this.scheduleServiceService.getAllScheduleService()).map(
      (item) => new ReturnScheduleServiceDto(item),
    );
  }

  @ApiOperation({ summary: 'Busca item de agendamento por id.' })
  @Get(':id')
  async getScheduleServiceById(
    @Param('id') id: number,
  ): Promise<ReturnScheduleServiceDto> {
    return new ReturnScheduleServiceDto(
      await this.scheduleServiceService.getScheduleServiceById(id),
    );
  }

  @ApiOperation({ summary: 'Cadastra item de agendamento.' })
  @Post()
  @UsePipes(ValidationPipe)
  async createScheduleService(
    @Body() createScheduleServiceDto: CreateScheduleServiceDto,
  ): Promise<ReturnScheduleServiceDto> {
    return new ReturnScheduleServiceDto(
      await this.scheduleServiceService.createScheduleService(
        createScheduleServiceDto,
      ),
    );
  }

  @ApiOperation({ summary: 'Atualiza item de agendamento.' })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateScheduleService(
    @Param('id') id: number,
    @Body() updateScheduleServiceDto: UpdateScheduleServiceDto,
  ): Promise<ReturnScheduleServiceDto> {
    return new ReturnScheduleServiceDto(
      await this.scheduleServiceService.updateScheduleService(
        id,
        updateScheduleServiceDto,
      ),
    );
  }

  @ApiOperation({ summary: 'Remove item de agendamento.' })
  @Delete(':id')
  async deleteScheduleService(@Param('id') id: number): Promise<DeleteResult> {
    return this.scheduleServiceService.deleteScheduleService(id);
  }
}
