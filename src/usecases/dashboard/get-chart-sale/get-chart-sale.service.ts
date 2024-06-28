import { Injectable } from '@nestjs/common';
import { GetTopSalesDto } from 'src/modules/dashboard/dto/get-list-sale';
import { GetTopSalesLineDto } from 'src/modules/dashboard/dto/get-top-sale.dto';
import { DashboardRepositoryService } from 'src/respositories/dashboard-repository/dashboard-repository.service';

@Injectable()
export class GetChartSaleService {
  constructor(
    private readonly dashboardRepositoryService: DashboardRepositoryService,
  ) {}
  async execute(query: GetTopSalesLineDto) {
    return await this.dashboardRepositoryService.queryTopSaleLine(query);
  }
}
