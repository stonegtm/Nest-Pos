import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from '../../respositories/product-respository/product-respository.service';

@Injectable()
export class DeleteProductService {
  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
  ) {}

  async execute(id: string) {
    try {
      const productData = await this.productRepositoryService.findOne(id);
      console.log(productData);
      const res = await this.productRepositoryService.delete(id);
      return { message: 'ลบสินค้าสำเร็จแล้ว', status: true };
    } catch (error) {
      // Handle any error that occurred during the save operation
      console.error(error); // Log the error for debugging
      throw new Error('Failed to save the category.'); // You can customize the error message
    }
  }
}
