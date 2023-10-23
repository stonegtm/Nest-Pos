import { Injectable } from '@nestjs/common';
import { ProductUpdateStockDto } from '../../modules/product/dto/product.dto';
import { ProductRepositoryService } from '../../respositories/product-respository/product-respository.service';

@Injectable()
export class UpdateStockService {
  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
  ) {}

  async execute(payload: ProductUpdateStockDto) {
    try {
      const itemStock = JSON.parse(payload.data_stock);
      console.log(itemStock);
      if (itemStock.length > 0) {
        itemStock?.map((item: any) => {
          this.productRepositoryService.updateStock(item.id, item.quantity);
        });
        return { status: true };
      } else {
        return { status: false };
      }
    } catch (error) {
      // Handle any error that occurred during the save operation
      console.error(error); // Log the error for debugging
      throw new Error('Failed to save the category.'); // You can customize the error message
    }
  }
}
