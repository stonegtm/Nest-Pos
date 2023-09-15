import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { UserDto } from '../../modules/auth/dto/user.dto';
@Injectable()
export class AuthRepositoryService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>,
    ) { }
    async save(body: UserEntity) {
        const entity = await this.authRepository.save(body);
        return entity
    }
    async findOneUser(body: UserDto) {
        const user = await this.authRepository.findOne({
            where: {
                username: body.username,
            },
        });
        return user
    }
}
