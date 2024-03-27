import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterUserService } from 'src/usecases/auth/register-user/register-user.service';
import { LoginService } from 'src/usecases/auth/login/login.service';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginService: LoginService,
    
    ) {}
  async create(createAuthDto: CreateAuthDto) {
    try {
      return await this.registerUserService.execute(createAuthDto);
    } catch (error) {
      throw new BadRequestException("Bad Request")
    }
  }
  async login(login: LoginDto) {
    try {
      return await this.loginService.execute(login);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
