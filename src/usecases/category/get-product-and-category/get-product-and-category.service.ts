import { Injectable } from '@nestjs/common';
import { CategoryRepositoryService } from 'src/respositories/category-respository/category-respository.service';

@Injectable()
export class GetProductAndCategoryService {
  constructor(
    private readonly categoryRepositoryService: CategoryRepositoryService,
  ) {}
  async execute() {
    const response = await this.categoryRepositoryService.getProductByCategory()
    return response;
  }
}
