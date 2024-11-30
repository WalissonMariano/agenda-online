import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserType } from './enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cadastra usuário.' })
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  //@Roles(UserType.Admin, UserType.User)
  @ApiOperation({ summary: 'Busca todos usuários.' })
  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (user) => new ReturnUserDto(user),
    );
  }
/*
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserbyIdUsingRelations(userId));
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDto: UpdatePasswordDto, 
    @UserId() userId: number,
  ): Promise<User> {
      return this.userService.updatePasswordUser(updatePasswordDto, userId)
    }
      */
 
}
