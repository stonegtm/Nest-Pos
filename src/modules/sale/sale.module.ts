import { Module } from '@nestjs/common';
import { UsecasesModule } from '../../usecases/usecases.module';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [UsecasesModule],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule { }
