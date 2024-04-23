import { Injectable } from '@nestjs/common';
import { CategoryRepositoryService } from 'src/respositories/category-respository/category-respository.service';

@Injectable()
export class GetProductByCategoryService {
  constructor(
    private readonly categoryRepositoryService: CategoryRepositoryService,
  ) {}
  async execute() {
    return await this.categoryRepositoryService.findProductBycate();
  }
}
