import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
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
import { RegisterUserService } from './auth/register-user/register-user.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { ProductEntity } from 'src/database/entities/product.entity';
import { SalesEntity } from 'src/database/entities/sales.entity';
import { ProductImageEntity } from 'src/database/entities/product_image';
import { SalesItemEntity } from 'src/database/entities/sales-item.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { LoginService } from './auth/login/login.service';
import { GetProductByCategoryService } from './product/get-product-by-category/get-product-by-category.service';
import { GetOneCategoryService } from './category/get-one-category/get-one-category.service';
import { ListSalesService } from './sale/list-sales/list-sales.service';
import { GetListSaleProductService } from './sale/get-list-sale-product/get-list-sale-product.service';
import { CancelOrderService } from './sale/cancel-order/cancel-order.service';
import { GetTopSalesService } from './dashboard/get-top-sales/get-top-sales.service';
import { GetChartSaleService } from './dashboard/get-chart-sale/get-chart-sale.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '123456', // Replace with your actual JWT secret
      signOptions: { expiresIn: '20d' }, // Set your desired expiration time
    }),
    RepositoriesModule,
    DatabaseModule,
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity,
      ProductImageEntity,
      SalesEntity,
      SalesItemEntity,
      UserEntity,
    ]),
  ],
  providers: [
    //Category
    AddCategoryService,
    FindAllCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    GetOneCategoryService,
    //Product
    AddProductService,
    FindAllProductService,
    UpdateProductService,
    DeleteProductService,
    FindOneProductService,
    UpdateStockService,
    GetProductAndCategoryService,
    GetProductByCategoryService,
    //User
    RegisterUserService,
    LoginService,
    //Sale
    CreateSaleService,
    ListSalesService,
    GetListSaleProductService,
    CancelOrderService,
    GetTopSalesService,
    GetChartSaleService,
  ],
  exports: [
    //Category
    AddCategoryService,
    FindAllCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    GetOneCategoryService,
    //Product
    AddProductService,
    FindAllProductService,
    UpdateProductService,
    DeleteProductService,
    FindOneProductService,
    UpdateStockService,
    GetProductAndCategoryService,
    GetProductByCategoryService,
    //User
    RegisterUserService,
    LoginService,
    //Sale
    CreateSaleService,
    ListSalesService,
    GetListSaleProductService,
    CancelOrderService,
    GetTopSalesService,
    GetChartSaleService,
  ],
})
export class UsecasesModule {}
