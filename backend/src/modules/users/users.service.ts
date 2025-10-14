import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '@/utils/bcrypt.util';
import { UserResponseDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { DeleteUserResponseDto } from './dto/response-delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) =>
      plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findUserById(id: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with ${username} not found`);
    }
    //return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true});
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
    return user;
  }

  async createAdminUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
      const hashedPassword = await hashPassword(createUserDto.password);
        const user = await this.prisma.user.create({
            data: {
                username: createUserDto.username,
                email: createUserDto.email,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        return user;
  }

  async ensureUserExist(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    await this.ensureUserExist(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        username: updateUserDto.username,
        password: updateUserDto.password,
      },
    });
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUser(id: string): Promise<DeleteUserResponseDto> {
    await this.ensureUserExist(id);

    await this.prisma.user.delete({ where: { id } });

    return { message: `User with ID ${id} deleted successfully` };
  }
}
