import { Controller, Get } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { ReturnEstablishmentDto } from './dto/return-establishment.dto';

@Controller('establishment')
export class EstablishmentController {
    constructor(
        private readonly establishmentService: EstablishmentService,
    ){}

    @Get()
    async getAllEstablishments(): Promise<ReturnEstablishmentDto[]> {
        return (await this.establishmentService.getAllEstablishmentst()).map(
            (establishments) => new ReturnEstablishmentDto(establishments)
        )
    }

}
