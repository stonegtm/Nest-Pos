import { Module } from '@nestjs/common';
import { UsecasesModule } from '../../usecases/usecases.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [UsecasesModule],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule { }
