import { Test, TestingModule } from '@nestjs/testing';
import { GetListSaleProductService } from './get-list-sale-product.service';

describe('GetListSaleProductService', () => {
  let service: GetListSaleProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetListSaleProductService],
    }).compile();

    service = module.get<GetListSaleProductService>(GetListSaleProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
