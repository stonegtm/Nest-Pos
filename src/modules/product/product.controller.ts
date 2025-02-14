import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiQuery } from '@nestjs/swagger';
import { ProductDto, ProductUpdateStockDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @ApiQuery({ name: 'category_id', required: false })
  async findAll(@Query('category') category_id?: string) {
    return await this.productService.findAll(category_id);
  }
  @Get('get-one-product/:id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Get('product-tabs')
  async getProductTab() {
    return await this.productService.getProductTab();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() product: ProductDto,
  ) {
    return await this.productService.create(files, product);
  }
  @Post('update_stock')
  async update_stock(@Body() product: ProductUpdateStockDto) {
    return await this.productService.updateStock(product);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() product: ProductDto,
  ) {
    return await this.productService.update(files, product, id);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
