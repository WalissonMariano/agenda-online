import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnTypeUserDto } from './dto/return-type-user.dto';
import { TypeUserService } from './type-user.service';

@ApiTags('TypeUser')
@ApiBearerAuth()
@Controller('type-user')
export class TypeUserController {
  constructor(private readonly typeUserService: TypeUserService) {}

  @ApiOperation({ summary: 'Lista tipos de usuário.' })
  @Get()
  async getAllTypeUser(): Promise<ReturnTypeUserDto[]> {
    return (await this.typeUserService.getAllTypeUser()).map(
      (typeUser) => new ReturnTypeUserDto(typeUser),
    );
  }

  @ApiOperation({ summary: 'Busca tipo de usuário por id.' })
  @Get(':id')
  async getTypeUserById(@Param('id') id: number): Promise<ReturnTypeUserDto> {
    return new ReturnTypeUserDto(
      await this.typeUserService.getTypeUserById(id),
    );
  }
}
