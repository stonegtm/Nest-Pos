import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../database/entities/category.entity';
import { CategoryDto } from '../../modules/category/dto/category.dto';
@Injectable()
export class CategoryRepositoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) { }
    async save(body: CategoryEntity) {
        const entity = await this.categoryRepository.save(body);
        return entity
    }
    async findOne(id: string) {
        const findOne = await this.categoryRepository.findOne({
            where: {
                id: id
            }
        });
        return findOne
    }
    async update(id: string, body: CategoryDto) {
        const update_category = await this.categoryRepository.update(id, body);
        return update_category
    }
    async findAllCategory() {
        const category = await this.categoryRepository.find();
        return category
    }
    async delete(id: string) {
        const delete_category = await this.categoryRepository.delete(id);
        return delete_category
    }
}
