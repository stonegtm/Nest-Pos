import { Injectable } from '@nestjs/common';
import { CategoryRepositoryService } from '../../respositories/category-respository/category-respository.service';

@Injectable()
export class FindAllCategoryService {
    constructor(
        private readonly categoryRepositoryService: CategoryRepositoryService
    ) { }
    async execute() {
        const category = this.categoryRepositoryService.findAllCategory()
        return category
    }
}
