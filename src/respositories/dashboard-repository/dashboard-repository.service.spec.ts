import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepositoryService } from './dashboard-repository.service';

describe('DashboardRepositoryService', () => {
  let service: DashboardRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardRepositoryService],
    }).compile();

    service = module.get<DashboardRepositoryService>(DashboardRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
