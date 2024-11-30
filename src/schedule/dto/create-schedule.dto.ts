import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsInt } from "class-validator";

export class CreateScheduleDto {

    @ApiProperty({
        description: 'Usuário da agenda.',
        example: 156,
      })
    @IsInt()
    userId: number;

    @ApiProperty({
        description: 'Estabelecimento da agenda.',
        example: 5,
      })
    @IsInt()
    establishmentId: number;

    @ApiProperty({
        description: 'Status da agenda.',
        example: 2,
      })
    @IsInt()
    statusId: number;

    @ApiProperty({
        description: 'Data da agenda.',
        example: '2024-10-10',
      })
    @IsDateString()
    scheduleDate: Date;

}