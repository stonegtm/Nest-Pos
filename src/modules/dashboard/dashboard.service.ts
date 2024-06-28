import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { GetTopSalesService } from 'src/usecases/dashboard/get-top-sales/get-top-sales.service';
import { GetTopSalesDto } from './dto/get-list-sale';
import { RESULT } from 'src/constants';
import { response } from 'src/shared/response';
import { MESSAGE } from 'src/constants/messages';
import { GetChartSaleService } from 'src/usecases/dashboard/get-chart-sale/get-chart-sale.service';
import { GetTopSalesLineDto } from './dto/get-top-sale.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly getTopSalesService: GetTopSalesService,
    private readonly getChartSaleService: GetChartSaleService,

  ) {}
  async getTopSales(query: GetTopSalesDto) {
    try {
      const topSales = await this.getTopSalesService.execute(query);
      return response(
        RESULT.TRUE,
        HttpStatus.CREATED,
        MESSAGE.SUCCESS,
        topSales,
      );
    } catch (error) {
      throw new BadRequestException('ไม่สามารถดูข้อมูล Top sales ได้');
    }
  }
  async getTopSaleLine(query: GetTopSalesLineDto) {
    try {
      const topSales = await this.getChartSaleService.execute(query);
      return response(
        RESULT.TRUE,
        HttpStatus.CREATED,
        MESSAGE.SUCCESS,
        topSales,
      );
    } catch (error) {
      throw new BadRequestException('ไม่สามารถดูข้อมูล Top sales ได้');
    }
  }

  
}
