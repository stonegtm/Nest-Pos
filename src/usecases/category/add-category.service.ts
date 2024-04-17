import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../database/entities/category.entity';
import { CategoryDto } from '../../modules/category/dto/category.dto';
import { CategoryRepositoryService } from '../../respositories/category-respository/category-respository.service';

@Injectable()
export class AddCategoryService {
  constructor(
    private readonly categoryRepositoryService: CategoryRepositoryService,
  ) {}

  async execute(payload: CategoryDto) {
    try {
      const result_category =
        await this.categoryRepositoryService.save(payload);
      // Assuming the save method returns the saved category
      return result_category;
    } catch (error) {
      // Handle any error that occurred during the save operation
      console.error(error); // Log the error for debugging
      throw new Error('Failed to save the category.'); // You can customize the error message
    }
  }
}
