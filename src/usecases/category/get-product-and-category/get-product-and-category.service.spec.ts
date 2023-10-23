import { Test, TestingModule } from '@nestjs/testing';
import { GetProductAndCategoryService } from './get-product-and-category.service';

describe('GetProductAndCategoryService', () => {
  let service: GetProductAndCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProductAndCategoryService],
    }).compile();

    service = module.get<GetProductAndCategoryService>(GetProductAndCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
