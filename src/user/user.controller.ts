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
import { Public } from '../common/decorators/public.decorator';
import { UserId } from '../common/decorators/user-id.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'Cadastra usuário.' })
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista usuários.' })
  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (user) => new ReturnUserDto(user),
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza senha do usuário logado.' })
  @UsePipes(ValidationPipe)
  @Patch('password/me')
  async updatePasswordUser(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @UserId() userId: number,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.updatePasswordUser(updatePasswordDto, userId),
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Busca usuário por id.' })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserById(id));
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza usuário.' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.updateUser(id, updateUserDto),
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove usuário.' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
