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
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ReturnScheduleDto } from './dto/return-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedule.service';

@ApiTags('Schedule')
@ApiBearerAuth()
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiOperation({ summary: 'Lista agendamentos.' })
  @Get()
  async getAllSchedule(): Promise<ReturnScheduleDto[]> {
    return (await this.scheduleService.getAllSchedule()).map(
      (schedule) => new ReturnScheduleDto(schedule),
    );
  }

  @ApiOperation({ summary: 'Busca agendamento por id.' })
  @Get(':id')
  async getScheduleById(@Param('id') id: number): Promise<ReturnScheduleDto> {
    return new ReturnScheduleDto(
      await this.scheduleService.getScheduleById(id),
    );
  }

  @ApiOperation({ summary: 'Cadastra agendamento.' })
  @UsePipes(ValidationPipe)
  @Post()
  async createSchedule(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<ReturnScheduleDto> {
    return new ReturnScheduleDto(
      await this.scheduleService.createSchedule(createScheduleDto),
    );
  }

  @ApiOperation({ summary: 'Atualiza agendamento.' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateSchedule(
    @Param('id') id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<ReturnScheduleDto> {
    return new ReturnScheduleDto(
      await this.scheduleService.updateSchedule(id, updateScheduleDto),
    );
  }

  @ApiOperation({ summary: 'Remove agendamento.' })
  @Delete(':id')
  async deleteSchedule(@Param('id') id: number): Promise<DeleteResult> {
    return this.scheduleService.deleteSchedule(id);
  }
}
