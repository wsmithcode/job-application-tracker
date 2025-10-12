import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '@/utils/bcrypt.util';

@Injectable()
export class UsersService {

    constructor (private readonly prisma: PrismaService) {}

    async findAll() {
        try {
            const users = await this.prisma.user.findMany();
             return users;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }

    async findUserById(id: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id }});
            return user;
        } catch (err) {
            throw new Error('Error fetching user by ID');
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = await hashPassword(createUserDto.password);
            const user = await this.prisma.user.create({
                data: {
                    username: createUserDto.username,
                    email: createUserDto.email,
                    password: hashedPassword,
                }
            })
            return user;
        } catch (err) {
            throw new Error('Error creating user');
        }
    }
}
