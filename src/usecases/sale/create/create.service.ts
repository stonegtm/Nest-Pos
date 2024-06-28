import { BadRequestException, Injectable } from '@nestjs/common';
import { SalesEntity } from '../../../database/entities/sales.entity';
import { CreateSaleDto } from '../../../modules/sale/dto/create-sale.dto';
import { SaleRepositoryService } from '../../../respositories/sale-respository/sale-respository.service';
import { SalesItemEntity } from 'src/database/entities/sales-item.entity';
import { ProductRepositoryService } from 'src/respositories/product-respository/product-respository.service';

@Injectable()
export class CreateSaleService {
  constructor(
    private readonly saleRepositoryService: SaleRepositoryService,
    private readonly productRepositoryService: ProductRepositoryService,
  ) {}
  async execute(payload: CreateSaleDto) {
    try {
      if (payload.product_detail.length < 1) {
        throw new BadRequestException('Invalid product.');
      }
      const saleModel = new SalesEntity();
      saleModel.discount = payload.discount;
      saleModel.totalAmount = payload.totalAmount;
      saleModel.totalSumAll = payload.totalSumAll;
      saleModel.notes = payload.notes;
      const saleBill = await this.saleRepositoryService.save(saleModel);
      if (saleBill) {
        payload.product_detail.map(async (item: any) => {
          let saleItemModel = new SalesItemEntity();
          const product = await this.productRepositoryService.findOne(item.id);
          let new_quantity = product.quantity - item.quantity;
          const updateResult = await this.productRepositoryService.update(
            item.id,
            { quantity: new_quantity },
          );
          if (updateResult) {
            saleItemModel.product = product;
            saleItemModel.sale = saleBill;
            saleItemModel.quantity = item.quantity;
            saleItemModel.unitPrice = item.price;
            saleItemModel.totalPrice = item.price_resualt;
            await this.saleRepositoryService.saveItem(saleItemModel);
          }
        });
      }
      return saleBill;
    } catch (error) {
      throw error;
    }
  }
}
