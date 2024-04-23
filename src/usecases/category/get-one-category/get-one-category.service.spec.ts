import { Test, TestingModule } from '@nestjs/testing';
import { GetOneCategoryService } from './get-one-category.service';

describe('GetOneCategoryService', () => {
  let service: GetOneCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOneCategoryService],
    }).compile();

    service = module.get<GetOneCategoryService>(GetOneCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
