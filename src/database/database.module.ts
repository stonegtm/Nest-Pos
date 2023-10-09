import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductImageEntity } from './entities/product_image';
import { SalesEntity } from './entities/sales.entity';
import { UserEntity } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123456',
            database: 'act',
            autoLoadEntities: true,
            synchronize: true, //set false for production
        }),
        TypeOrmModule.forFeature([UserEntity, CategoryEntity, ProductEntity, SalesEntity, ProductImageEntity]),
    ],
})
export class DatabaseModule { }