import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ReturnScheduleDto } from './dto/return-schedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { DeleteResult } from 'typeorm';

@Controller('schedule')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
    ){}

    @Get()
    async getAllSchedule(): Promise<ReturnScheduleDto[]> {
        return (await this.scheduleService.getAllSchedule()).map(
            (schedule) => new ReturnScheduleDto(schedule),
        )
    }

    @Get(':id')
    async getScheduleById(
        @Param('id')
        id: number
    ): Promise<ReturnScheduleDto> {
        return new ReturnScheduleDto(await this.scheduleService.getScheduleById(id));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createSchedule(
        @Body()
        createScheduleDto: CreateScheduleDto
    ): Promise<ScheduleEntity> {
        return this.scheduleService.createSchedule(createScheduleDto);
    }

    @Delete(':id')
    async deleteSchedule(
        @Param('id')
        id: number
    ): Promise<DeleteResult> {
        return this.scheduleService.deleteSchedule(id);
    }

}
