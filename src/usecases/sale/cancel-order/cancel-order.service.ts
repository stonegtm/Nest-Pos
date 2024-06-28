import { Injectable } from '@nestjs/common';
import { SaleRepositoryService } from 'src/respositories/sale-respository/sale-respository.service';

@Injectable()
export class CancelOrderService {
  constructor(private readonly saleRepositoryService: SaleRepositoryService) {}
  async execute(id: string) {
    const cancel_order = await this.saleRepositoryService.cancelOrder(id);
    return cancel_order
  }
}
