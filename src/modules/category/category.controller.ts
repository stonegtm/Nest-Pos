import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }
  @Get('get-product-by-category')
  async findProductByCategory() {
    return await this.categoryService.findProductByCategory();
  }
  @Post()
  async create(@Body() category: CategoryDto) {
    return await this.categoryService.create(category);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() category: CategoryDto) {
    return await this.categoryService.update(category, id);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
