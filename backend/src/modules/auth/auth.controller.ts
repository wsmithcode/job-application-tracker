import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const login = await this.authService.login(loginDto);

    return {
      message: 'Login successful',
      data: login,
    };
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const signup = await this.authService.signup(signupDto);

    return {
      message: 'Account created successfully',
      data: signup,
    };
  }

  @Post('logout')
  async logout() {
    const result = await this.authService.logout();

    return result;
  }
}
