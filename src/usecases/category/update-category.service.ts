import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CategoryEntity } from "../../database/entities/category.entity";
import { CategoryDto } from "../../modules/category/dto/category.dto";
import { CategoryRepositoryService } from '../../respositories/category-respository/category-respository.service';


@Injectable()
export class UpdateCategoryService {
    constructor(
        private readonly categoryRepositoryService: CategoryRepositoryService
    ) { }

    async execute(payload: CategoryDto, id: string): Promise<{ updateResult: UpdateResult; updatedCategory: CategoryEntity }> {
        try {
            const existingCategory = await this.categoryRepositoryService.findOne(id);

            if (!existingCategory) {
                throw new NotFoundException('Category not found'); // Throw a 404 error if the category doesn't exist
            }

            const updateResult = await this.categoryRepositoryService.update(id, payload);

            // Fetch the updated entity separately
            const updatedCategory = await this.categoryRepositoryService.findOne(id);

            return { updateResult, updatedCategory };
        } catch (error) {
            // Handle any error that occurred during the save operation
            console.error(error); // Log the error for debugging
            throw new Error('Failed to save the category.'); // You can customize the error message
        }
    }
}