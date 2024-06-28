import { Injectable } from '@nestjs/common';
import { GetTopSalesDto } from 'src/modules/dashboard/dto/get-list-sale';
import { DashboardRepositoryService } from 'src/respositories/dashboard-repository/dashboard-repository.service';

@Injectable()
export class GetTopSalesService {
  constructor(
    private readonly dashboardRepositoryService: DashboardRepositoryService,
  ) {}
  async execute(query: GetTopSalesDto) {
    return await this.dashboardRepositoryService.queryTopSales(query)
  }
}
