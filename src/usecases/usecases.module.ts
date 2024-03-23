import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RepositoriesModule } from '../respositories/repositories.module';
import { AddCategoryService } from './category/add-category.service';
import { DeleteCategoryService } from './category/delete-category.service';
import { FindAllCategoryService } from './category/find-all-category.service';
import { GetProductAndCategoryService } from './category/get-product-and-category/get-product-and-category.service';
import { UpdateCategoryService } from './category/update-category.service';
import { AddProductService } from './product/add-product.service';
import { DeleteProductService } from './product/delete-category.service';
import { FindAllProductService } from './product/find-all-product.service';
import { FindOneProductService } from './product/find-one-product.service';
import { UpdateProductService } from './product/update-product.service';
import { UpdateStockService } from './product/update-stock.service';
import { CreateSaleService } from './sale/create/create.service';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.register({
      secret: '123456', // Replace with your actual JWT secret
      signOptions: { expiresIn: '20d' }, // Set your desired expiration time
    }),
  ],
  providers: [
    //Category
    AddCategoryService,
    FindAllCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    //Product
    AddProductService,
    FindAllProductService,
    UpdateProductService,
    DeleteProductService,
    CreateSaleService,
    FindOneProductService,
    UpdateStockService,
    GetProductAndCategoryService,
  ],
  exports: [
    //Category
    AddCategoryService,
    FindAllCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    //Product
    AddProductService,
    FindAllProductService,
    UpdateProductService,
    DeleteProductService,
    CreateSaleService,
    FindOneProductService,
    UpdateStockService,
    GetProductAndCategoryService,
  ],
})
export class UsecasesModule {}
