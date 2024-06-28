import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { SalesEntity } from '../../database/entities/sales.entity';
import { SalesItemEntity } from 'src/database/entities/sales-item.entity';
import { GetListSaleDto } from 'src/modules/sale/dto/get-list-sale';
import * as moment from 'moment-timezone';
import { GetListSaleProductDto } from 'src/modules/sale/dto/get-list-sale-product';
import { ProductEntity } from 'src/database/entities/product.entity';
import { LogSaleEntity } from 'src/database/entities/log-sales.entity';
@Injectable()
export class SaleRepositoryService {
  constructor(
    @InjectRepository(SalesEntity)
    private readonly saleRepository: Repository<SalesEntity>,
    @InjectRepository(SalesItemEntity)
    private readonly salesItemEntity: Repository<SalesItemEntity>,
    @InjectRepository(ProductEntity)
    private readonly productEntityRepo: Repository<ProductEntity>,
    @InjectRepository(LogSaleEntity)
    private readonly logSaleEntityRepo: Repository<LogSaleEntity>,
  ) {}
  async save(body: SalesEntity) {
    const entity = await this.saleRepository.save(body);
    return entity;
  }
  async saveItem(body: SalesItemEntity) {
    const salesItemEntity = await this.salesItemEntity.save(body);
    return salesItemEntity;
  }
  async getListSale(query: GetListSaleDto) {
    if (query?.start_date && query?.end_date) {
      const timeZone = 'Asia/Bangkok';
      const startDate = moment
        .tz(query.start_date, timeZone)
        .startOf('day')
        .toDate();
      const endDate = moment.tz(query.end_date, timeZone).endOf('day').toDate();
      const listsale = await this.saleRepository.find({
        where: {
          created_at: Between(startDate, endDate),
        },
        order: {
          created_at: 'desc',
        },
      });
      console.log(listsale);
      return listsale;
    } else {
      const listSales = await this.saleRepository.find({
        order: {
          created_at: 'desc',
        },
      });
      return listSales;
    }
  }
  async getListSaleProduct(id: string) {
    const listsale = await this.saleRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        saleItems: {
          product: true,
        },
      },
    });
    if (!listsale) {
      throw new Error(`Sale with ID ${listsale} not found`);
    }
    return listsale;
  }
  async cancelOrder(id: string) {
    // Find the order with its sale items and their products
    const order = await this.saleRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        saleItems: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new Error('Order not found.');
    }

    // Soft delete the order
    const softDelResult = await this.saleRepository.softDelete(order.id);
    if (!softDelResult.affected) {
      throw new Error('Failed to cancel the order.');
    }
    const logEntity = new LogSaleEntity();
    logEntity.sales = order;
    logEntity.detail = JSON.stringify(order);
    await this.logSaleEntityRepo.save(logEntity);
    // Loop through the sale items and update their status and product quantities
    for (const saleItem of order.saleItems) {
      // Soft delete the sale item
      await this.salesItemEntity.softDelete(saleItem.id);

      // Find the product and update its quantity
      const product = await this.productEntityRepo.findOne({
        where: { id: saleItem.product.id },
      });

      if (!product) {
        throw new Error(`Product with ID ${saleItem.product.id} not found.`);
      }

      const newQuantity = product.quantity + saleItem.quantity;

      // Update the product quantity
      await this.productEntityRepo.update(saleItem.product.id, {
        quantity: newQuantity,
      });
    }
    return true;
  }
}
