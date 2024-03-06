import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductImageEntity } from './entities/product_image';
import { SalesEntity } from './entities/sales.entity';
import { UserEntity } from './entities/user.entity';
import { SalesItemEntity } from './entities/sales-item.entity';
import { ENV } from '../common/env/env';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '45.144.164.18',
      port: 5432,
      username: "poseggadmin",
      password: "YHkxty3UFi48YY4qZ7XjY7Cx9eoiTpTBDSJ7i7RVgvJaVsxrKAp4KTz6",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true, //set false for production
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      CategoryEntity,
      ProductEntity,
      SalesEntity,
      ProductImageEntity,
      SalesItemEntity,
    ]),
  ],
})
export class DatabaseModule {}
