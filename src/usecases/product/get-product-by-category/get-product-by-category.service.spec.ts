import { Test, TestingModule } from '@nestjs/testing';
import { GetProductByCategoryService } from './get-product-by-category.service';

describe('GetProductByCategoryService', () => {
  let service: GetProductByCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProductByCategoryService],
    }).compile();

    service = module.get<GetProductByCategoryService>(GetProductByCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
