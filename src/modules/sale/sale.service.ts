import { HttpStatus, Injectable } from '@nestjs/common';
import { RESULT } from '../../constants';
import { MESSAGE } from '../../constants/messages';
import { response } from '../../shared/response';
import { CreateSaleService } from '../../usecases/sale/create/create.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SaleService {
  constructor(
    private readonly createSaleService: CreateSaleService
  ) { }
  async create(createSaleDto: CreateSaleDto) {
    try {
      const result_create_sale = await this.createSaleService.execute(createSaleDto)
      if (result_create_sale) {
        return response(RESULT.TRUE, HttpStatus.CREATED, MESSAGE.SUCCESS);
      } else {
        return response(RESULT.FALSE, HttpStatus.BAD_REQUEST, MESSAGE.ERROR_SAVE);
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
    return 'This action adds a new sale';
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
