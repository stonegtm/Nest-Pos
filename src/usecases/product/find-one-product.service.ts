import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from '../../respositories/product-respository/product-respository.service';

@Injectable()
export class FindOneProductService {
  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
  ) {}

  async execute(product_id) {
    try {
      const productData = this.productRepositoryService.findOne(product_id);
      return productData;
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw new Error('Failed to save the category.'); // You can customize the error message
    }
  }
}
