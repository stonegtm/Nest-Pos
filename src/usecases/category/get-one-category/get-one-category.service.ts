import { Injectable } from '@nestjs/common';
import { CategoryRepositoryService } from 'src/respositories/category-respository/category-respository.service';

@Injectable()
export class GetOneCategoryService {
  constructor(
    private readonly categoryRepositoryService: CategoryRepositoryService,
  ) {}
  async execute(id: string) {
    return this.categoryRepositoryService.findOne(id)
  }
}
