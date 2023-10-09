import { Injectable } from '@nestjs/common';
import { SalesEntity } from '../../../database/entities/sales.entity';
import { CreateSaleDto } from '../../../modules/sale/dto/create-sale.dto';
import { SaleRepositoryService } from '../../../respositories/sale-respository/sale-respository.service';

@Injectable()
export class CreateSaleService {
    constructor(
        private readonly saleRepositoryService: SaleRepositoryService,
    ) { }
    async execute(payload: CreateSaleDto) {
        const saleModel = new SalesEntity()
        saleModel.product_id = payload.product_id
        saleModel.quantity = payload.quantity
        saleModel.unit_price = payload.unit_price
        saleModel.total_price = payload.total_price
        const res = await this.saleRepositoryService.save(saleModel)
        return res
    }
}
