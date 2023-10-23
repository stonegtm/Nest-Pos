import { Injectable } from '@nestjs/common';
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
    const saleModel = new SalesEntity();
    saleModel.discount = payload.discount;
    saleModel.totalAmount = payload.totalAmount;
    saleModel.totalSumAll = payload.totalSumAll;
    saleModel.notes = payload.notes;
    const saleBill = await this.saleRepositoryService.save(saleModel);
    if (saleBill) {
      let saleItemModel = new SalesItemEntity();
      payload.product.map(async (item: any) => {
        console.log(item)
        const product = await this.productRepositoryService.findOne(item.id);
        saleItemModel.product = product;
        saleItemModel.sale = saleBill;
        saleItemModel.quantity = item.quantity;
        saleItemModel.unitPrice = item.unitPrice;
        saleItemModel.totalPrice = item.totalPrice;
        await this.saleRepositoryService.saveItem(saleItemModel)
      });
    }
    return saleBill;
  }
}
