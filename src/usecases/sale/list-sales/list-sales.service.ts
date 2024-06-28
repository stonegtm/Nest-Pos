import { Injectable } from '@nestjs/common';
import { GetListSaleDto } from 'src/modules/sale/dto/get-list-sale';
import { SaleRepositoryService } from 'src/respositories/sale-respository/sale-respository.service';
import * as moment from 'moment-timezone';

@Injectable()
export class ListSalesService {
  constructor(private readonly saleRepositoryService: SaleRepositoryService) {}
  async execute(query: GetListSaleDto) {
    const list_sale = await this.saleRepositoryService.getListSale(query);
    list_sale.map((data: any) => {
      data.created_at =
        moment
          .tz(data.created_at, 'Asia/Bangkok')
          .locale('th')
          .format('DD MMMM ') +
        (moment.tz(data.created_at, 'Asia/Bangkok').year() + 543) +
        ' เวลา ' +
        moment.tz(data.created_at, 'Asia/Bangkok').format(' HH:mm ') +
        'น.';
    });
    return list_sale;
  }
}
