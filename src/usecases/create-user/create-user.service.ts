import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../database/entities/user.entity";
import { UserDto } from "../../modules/auth/dto/user.dto";
import { AuthRepositoryService } from "../../respositories/auth-respository/auth-respository.service";



@Injectable()
export class CreateUserService {
    constructor(
        private readonly authRepositoryService: AuthRepositoryService
    ) { }

    async execute(payload: UserDto): Promise<UserEntity> {
        const register = new UserEntity()
        register.email = payload.email
        register.username = payload.username
        register.password = payload.password
        const response = await this.authRepositoryService.save(register)
        return response
    }
}