import { HttpStatus, Injectable } from '@nestjs/common';
import { RESULT } from '../../constants';
import { MESSAGE } from '../../constants/messages';
import { response } from '../../shared/response';
import { CreateSaleService } from '../../usecases/sale/create/create.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ListSalesService } from 'src/usecases/sale/list-sales/list-sales.service';
import { GetListSaleDto } from './dto/get-list-sale';
import { GetListSaleProductService } from 'src/usecases/sale/get-list-sale-product/get-list-sale-product.service';
import { GetListSaleProductDto } from './dto/get-list-sale-product';
import { CancelOrderService } from 'src/usecases/sale/cancel-order/cancel-order.service';

@Injectable()
export class SaleService {
  constructor(
    private readonly createSaleService: CreateSaleService,
    private readonly listSalesService: ListSalesService,
    private readonly getListSaleProductService: GetListSaleProductService,
    private readonly cancelOrderService: CancelOrderService,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
    try {
      const result_create_sale =
        await this.createSaleService.execute(createSaleDto);
      if (result_create_sale) {
        return response(RESULT.TRUE, HttpStatus.CREATED, MESSAGE.SUCCESS);
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
      }
    } catch (error) {
      return response(
        RESULT.FALSE,
        HttpStatus.INTERNAL_SERVER_ERROR,
        MESSAGE.NET_ERROR,
        '',
        error,
      );
    }
  }

  async getListSale(query: GetListSaleDto) {
    try {
      const list_sales: any = await this.listSalesService.execute(query);
      if (list_sales) {
        return response(
          RESULT.TRUE,
          HttpStatus.OK,
          MESSAGE.SUCCESS,
          list_sales,
        );
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
      }
    } catch (error) {
      return response(
        RESULT.FALSE,
        HttpStatus.INTERNAL_SERVER_ERROR,
        MESSAGE.NET_ERROR,
        '',
        error,
      );
    }
  }

  async findOne(id: string) {
    try {
      const list_sales_product: any =
        await this.getListSaleProductService.execute(id);
      if (list_sales_product) {
        return response(
          RESULT.TRUE,
          HttpStatus.OK,
          MESSAGE.SUCCESS,
          list_sales_product,
        );
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
      }
    } catch (error) {
      return response(
        RESULT.FALSE,
        HttpStatus.INTERNAL_SERVER_ERROR,
        MESSAGE.NET_ERROR,
        '',
        error,
      );
    }
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  async cancelOrder(id: string) {
    try {
      const cancel_order: any = await this.cancelOrderService.execute(id);
      if (cancel_order) {
        return response(
          RESULT.TRUE,
          HttpStatus.OK,
          MESSAGE.SUCCESS,
          cancel_order,
        );
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
      }
    } catch (error) {
      return response(
        RESULT.FALSE,
        HttpStatus.INTERNAL_SERVER_ERROR,
        MESSAGE.NET_ERROR,
        '',
        error,
      );
    }
  }
}
