import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { CategoryEntity } from '../database/entities/category.entity';
import { ProductEntity } from '../database/entities/product.entity';
import { ProductImageEntity } from '../database/entities/product_image';
import { SalesEntity } from '../database/entities/sales.entity';
import { UserEntity } from '../database/entities/user.entity';
import { AuthRepositoryService } from './auth-respository/auth-respository.service';
import { CategoryRepositoryService } from './category-respository/category-respository.service';
import { ProductRepositoryService } from './product-respository/product-respository.service';
import { SaleRepositoryService } from './sale-respository/sale-respository.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity, CategoryEntity, ProductEntity, ProductImageEntity, SalesEntity])],
  providers: [AuthRepositoryService, CategoryRepositoryService, ProductRepositoryService, SaleRepositoryService],
  exports: [AuthRepositoryService, CategoryRepositoryService, ProductRepositoryService, SaleRepositoryService],
})
export class RepositoriesModule { }
