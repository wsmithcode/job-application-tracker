import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from '@modules/users/users.service';
import { comparePassword } from '@/utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async  validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);
    await this.VerifyPassword(password, user.password);

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async VerifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordValid = await comparePassword(password, hashedPassword);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return isPasswordValid;
  }

  async signup(signupDto: SignupDto) {
    const user = await this.usersService.createUser(signupDto);
    return user;
  }

  async logout() {
    await this.usersService.findUserByUsername('dummy');
    return 'logout';
  }
}
