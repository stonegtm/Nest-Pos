import { Test, TestingModule } from '@nestjs/testing';
import { GetTopSalesService } from './get-top-sales.service';

describe('GetTopSalesService', () => {
  let service: GetTopSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTopSalesService],
    }).compile();

    service = module.get<GetTopSalesService>(GetTopSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
