import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { LoginDto } from 'src/modules/auth/dto/login-auth.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async execute(payload: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: payload.username,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user && (await bcrypt.compare(payload.password, user.password))) {
      // Omit the password and any other sensitive fields
      const { password, ...result } = user;
      const payload = { username: user.username };
      return {
        access_token: this.jwtService.sign(payload), // Generate the token
      };
    }
    throw new UnauthorizedException();
  }
}
