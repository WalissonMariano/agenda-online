import { Controller, Get } from '@nestjs/common';
import { ReturnTypeUserDto } from './dto/return-type-user.dto';
import { TypeUserService } from './type_user.service';

@Controller('typeuser')
export class TypeUserController {
    constructor(
        private readonly typeUserService: TypeUserService,
    ) {}

    @Get()
    async getAllTypeUser(): Promise<ReturnTypeUserDto[]> {
        return (await this.typeUserService.getAllTypeUser()).map(
            (typeUser) => new ReturnTypeUserDto(typeUser),
        );
    }

}
