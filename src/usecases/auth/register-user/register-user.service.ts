import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateAuthDto } from 'src/modules/auth/dto/create-auth.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RegisterUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async execute(createAuthDto: CreateAuthDto) {
    const { password } = createAuthDto;
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(); // The default salt rounds is 10
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace the plain text password with the hashed one in the DTO
    const createUser = {
      ...createAuthDto,
      password: hashedPassword,
    };

    // Save the user with the hashed password to the database
    return await this.userRepository.save(createUser)
  }
}
