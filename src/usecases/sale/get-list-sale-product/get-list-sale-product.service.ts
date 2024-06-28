import { Injectable } from '@nestjs/common';
import { GetListSaleProductDto } from 'src/modules/sale/dto/get-list-sale-product';
import { SaleRepositoryService } from 'src/respositories/sale-respository/sale-respository.service';

@Injectable()
export class GetListSaleProductService {
  constructor(private readonly saleRepositoryService: SaleRepositoryService) {}
  async execute(id: string){
    return await this.saleRepositoryService.getListSaleProduct(id)
    }
}
