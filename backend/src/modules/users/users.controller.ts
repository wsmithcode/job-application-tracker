import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  async findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.users.findUserById(id);
  }

  @Post('admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    const user = await this.users.createAdminUser(createUserDto);
    return {
      message: 'Admin user created successfully',
      data: user,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.users.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.users.deleteUser(id);
  }
}
