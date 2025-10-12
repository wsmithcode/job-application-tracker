import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    return loginDto;
  }

  async signup(signupDto: SignupDto) {
    const user = await this.usersService.createUser(signupDto);
    return user;
  }

  async logout() {
    return 'logout';
  }
}
