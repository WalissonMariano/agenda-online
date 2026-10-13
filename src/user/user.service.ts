import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  createPasswordHashed,
  validatePassword,
} from '../common/utils/password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.getUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const passwordHashed = await createPasswordHashed(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: passwordHashed,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuário ${userId} não encontrado.`);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`E-mail ${email} não encontrado.`);
    }

    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUserById(userId);

    return this.userRepository.save({
      ...user,
      ...updateUserDto,
      password: user.password,
    });
  }

  async updatePasswordUser(
    updatePasswordDto: UpdatePasswordDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.getUserById(userId);

    const isMatch = await validatePassword(
      updatePasswordDto.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Senha atual inválida.');
    }

    const passwordHashed = await createPasswordHashed(
      updatePasswordDto.newPassword,
    );

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.getUserById(userId);
    await this.userRepository.delete({ id: userId });
  }
}
