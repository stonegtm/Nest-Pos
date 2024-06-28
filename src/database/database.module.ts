import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductImageEntity } from './entities/product_image';
import { SalesItemEntity } from './entities/sales-item.entity';
import { ENV } from '../common/env/env';
import { SalesEntity } from './entities/sales.entity';
import { UserEntity } from './entities/user.entity';
import { CategoryKeepProductEntity } from './entities/category-keep-product';
import { LogSaleEntity } from './entities/log-sales.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'pos_egg',
      autoLoadEntities: true,
      synchronize: true, //set false for production
    }),
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity,
      SalesEntity,
      ProductImageEntity,
      SalesItemEntity,
      LogSaleEntity,
      UserEntity,
      CategoryKeepProductEntity,
    ]),
  ],
})
export class DatabaseModule {}
