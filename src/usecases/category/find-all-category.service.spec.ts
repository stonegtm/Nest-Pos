import { Test, TestingModule } from '@nestjs/testing';
import { FindAllCategoryService } from './find-all-category.service';

describe('FindAllCategoryService', () => {
  let service: FindAllCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllCategoryService],
    }).compile();

    service = module.get<FindAllCategoryService>(FindAllCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
