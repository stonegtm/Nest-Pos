import { Module } from '@nestjs/common';
import { UsecasesModule } from '../../usecases/usecases.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    imports: [UsecasesModule],
    providers: [CategoryService],
    controllers: [CategoryController]
})
export class CategoryModule { }
