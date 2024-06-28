import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { GetListSaleDto } from './dto/get-list-sale';
import { GetListSaleProductDto } from './dto/get-list-sale-product';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('product')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get('list-sales')
  getListSale(@Query() query: GetListSaleDto) {
    return this.saleService.getListSale(query);
  }

  @Get('list-product/:id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Post('cancel-order/:id')
  cancelOrder(@Param('id') id: string) {
    return this.saleService.cancelOrder(id);
  }
}
