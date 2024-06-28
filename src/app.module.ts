import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { RepositoriesModule } from './respositories/repositories.module';
import { UsecasesModule } from './usecases/usecases.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JwtModule,  } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: '123456', // Replace with your actual JWT secret
      signOptions: { expiresIn: '20d' }, // Set your desired expiration time
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/env/${process.env.NODE_ENV || 'prod'}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../files'),
    }),
    DatabaseModule,
    RepositoriesModule,
    UsecasesModule,
    CategoryModule,
    ProductModule,
    SaleModule,
    AuthModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
