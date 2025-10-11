import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    
    async login(loginDto: LoginDto) {
        return loginDto
    }

    async signup(signupDto: SignupDto) {
        return signupDto;
    }

    async logout() {
        return 'logout'
    }

}