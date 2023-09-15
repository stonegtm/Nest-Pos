import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// import { LoginDto } from './dto/login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    create(@Body() authData: any) {
        console.log("==========>", authData);
        return this.authService.create(authData);
    }
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.validateUser(loginDto);
    }
}
