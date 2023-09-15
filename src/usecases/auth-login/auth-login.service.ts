import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../../modules/auth/dto/login.dto';
import { AuthRepositoryService } from '../../respositories/auth-respository/auth-respository.service';

@Injectable()
export class AuthLoginService {
    constructor(
        private readonly authRepositoryService: AuthRepositoryService,
        private jwtService: JwtService,
    ) { }
    async execute(payload: LoginDto): Promise<any> {
        const user = await this.authRepositoryService.findOneUser(payload)
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(payload.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        delete user.password
        return this.login(user)
    }
    private async login(user: any): Promise<any> {
        console.log('user', user)
        const payload = { username: user.username, email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
