import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RepositoriesModule } from '../respositories/repositories.module';
import { AuthLoginService } from './auth-login/auth-login.service';
import { AddCategoryService } from './category/add-category.service';
import { FindAllCategoryService } from './category/find-all-category.service';
import { UpdateCategoryService } from './category/update-category.service';
import { CreateUserService } from './create-user/create-user.service';

@Module({
  imports: [RepositoriesModule,
    JwtModule.register({
      secret: '123456', // Replace with your actual JWT secret
      signOptions: { expiresIn: '20d' }, // Set your desired expiration time
    })],
  providers: [
    CreateUserService,
    AuthLoginService, AddCategoryService, FindAllCategoryService, UpdateCategoryService
  ],
  exports: [
    CreateUserService,
    AuthLoginService, AddCategoryService, FindAllCategoryService, UpdateCategoryService
  ],
})
export class UsecasesModule { }
