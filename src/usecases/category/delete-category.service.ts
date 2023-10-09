import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepositoryService } from '../../respositories/category-respository/category-respository.service';


@Injectable()
export class DeleteCategoryService {
    constructor(
        private readonly categoryRepositoryService: CategoryRepositoryService
    ) { }

    async execute(id: string) {
        try {
            const existingCategory = await this.categoryRepositoryService.findOne(id);
            if (!existingCategory) {
                throw new NotFoundException('Category not found'); // Throw a 404 error if the category doesn't exist
            }
            await this.categoryRepositoryService.delete(id);
            return { message: "ลบเมนูสำเร็จแล้ว", status: true };
        } catch (error) {
            // Handle any error that occurred during the save operation
            console.error(error); // Log the error for debugging
            throw new Error('Failed to save the category.'); // You can customize the error message
        }
    }
}