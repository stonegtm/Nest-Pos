import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductImageEntity } from './entities/product_image';
import { SalesItemEntity } from './entities/sales-item.entity';
import { SalesEntity } from './entities/sales.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST_DB'),
        port: configService.get<number>('PORT_DB'),
        password: configService.get<string>('PASSWORD_DB'),
        username: configService.get<string>('USERNAME_DB'),
        database: configService.get<string>('DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([
      CategoryEntity,
      ProductEntity,
      SalesEntity,
      ProductImageEntity,
      SalesItemEntity,
    ]),
  ],
})
export class DatabaseModule {}
