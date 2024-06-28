import { Test, TestingModule } from '@nestjs/testing';
import { GetChartSaleService } from './get-chart-sale.service';

describe('GetChartSaleService', () => {
  let service: GetChartSaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetChartSaleService],
    }).compile();

    service = module.get<GetChartSaleService>(GetChartSaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
