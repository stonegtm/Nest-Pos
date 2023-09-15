import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { CategoryEntity } from '../database/entities/category.entity';
import { UserEntity } from '../database/entities/user.entity';
import { AuthRepositoryService } from './auth-respository/auth-respository.service';
import { CategoryRepositoryService } from './category-respository/category-respository.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity, CategoryEntity])],
  providers: [AuthRepositoryService, CategoryRepositoryService],
  exports: [AuthRepositoryService, CategoryRepositoryService],
})
export class RepositoriesModule { }
