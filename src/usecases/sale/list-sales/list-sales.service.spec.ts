import { Test, TestingModule } from '@nestjs/testing';
import { ListSalesService } from './list-sales.service';

describe('ListSalesService', () => {
  let service: ListSalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListSalesService],
    }).compile();

    service = module.get<ListSalesService>(ListSalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
