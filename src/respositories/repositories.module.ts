import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesItemEntity } from 'src/database/entities/sales-item.entity';
import { DatabaseModule } from '../database/database.module';
import { CategoryEntity } from '../database/entities/category.entity';
import { ProductEntity } from '../database/entities/product.entity';
import { ProductImageEntity } from '../database/entities/product_image';
import { SalesEntity } from '../database/entities/sales.entity';
import { CategoryRepositoryService } from './category-respository/category-respository.service';
import { ProductRepositoryService } from './product-respository/product-respository.service';
import { SaleRepositoryService } from './sale-respository/sale-respository.service';
import { CategoryKeepProductEntity } from 'src/database/entities/category-keep-product';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity,
      ProductImageEntity,
      SalesEntity,
      SalesItemEntity,
      CategoryKeepProductEntity
    ]),
  ],
  providers: [
    CategoryRepositoryService,
    ProductRepositoryService,
    SaleRepositoryService,
  ],
  exports: [
    CategoryRepositoryService,
    ProductRepositoryService,
    SaleRepositoryService,
  ],
})
export class RepositoriesModule {}
