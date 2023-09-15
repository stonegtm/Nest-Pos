import { Injectable } from '@nestjs/common';
import { AuthLoginService } from '../../usecases/auth-login/auth-login.service';
import { CreateUserService } from '../../usecases/create-user/create-user.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly authLoginService: AuthLoginService,

    ) { }
    async create(createUserDto: UserDto) {
        try {
            return await this.createUserService.execute(createUserDto);
        } catch (error) {
            throw error;
        }
    }
    async validateUser(validateUser: UserDto): Promise<any> {
        try {
            const data_login = await this.authLoginService.execute(validateUser);
            return {
                Message: "Success",
                data_login
            }
        } catch (error) {
            throw error;
        }
    }
}
