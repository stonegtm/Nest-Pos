import { HttpStatus, Injectable } from '@nestjs/common';
import { RESULT } from '../../constants';
import { MESSAGE } from '../../constants/messages';
import { response } from '../../shared/response';
import { AddCategoryService } from '../../usecases/category/add-category.service';
import { DeleteCategoryService } from '../../usecases/category/delete-category.service';
import { FindAllCategoryService } from '../../usecases/category/find-all-category.service';
import { UpdateCategoryService } from '../../usecases/category/update-category.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        private readonly addCategoryService: AddCategoryService,
        private readonly updateCategoryService: UpdateCategoryService,
        private readonly findAllCategoryService: FindAllCategoryService,
        private readonly deleteCategoryService: DeleteCategoryService
    ) { }
    async findAll() {
        try {
            const find_category_all: any = await this.findAllCategoryService.execute()
            if (find_category_all.length > 0) {
                return response(RESULT.TRUE, HttpStatus.OK, MESSAGE.SUCCESS, find_category_all);
            } else {
                return response(RESULT.FALSE, HttpStatus.BAD_REQUEST, MESSAGE.DATA_EMPTY);
            }
        } catch (error) {
            return response(
                RESULT.FALSE,
                HttpStatus.INTERNAL_SERVER_ERROR,
                MESSAGE.NET_ERROR,
                '',
                error,
            );
        }
    }
    async create(category: CategoryDto) {
        try {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>", category)
            const result_create_category = await this.addCategoryService.execute(category)
            if (result_create_category.id) {
                return response(RESULT.TRUE, HttpStatus.CREATED, MESSAGE.SUCCESS);
            } else {
                return response(RESULT.FALSE, HttpStatus.BAD_REQUEST, MESSAGE.ERROR_SAVE);
            }
        } catch (error) {
            return response(
                RESULT.FALSE,
                HttpStatus.INTERNAL_SERVER_ERROR,
                MESSAGE.NET_ERROR,
                '',
                error,
            );
        }
    }

    async update(category: CategoryDto, id: string) {
        try {
            const result_update_category = await this.updateCategoryService.execute(category, id)
            if (result_update_category) {
                return response(RESULT.TRUE, HttpStatus.OK, MESSAGE.SUCCESS);
            } else {
                return response(RESULT.FALSE, HttpStatus.BAD_REQUEST, MESSAGE.ERROR_SAVE);
            }
        } catch (error) {
            return response(
                RESULT.FALSE,
                HttpStatus.INTERNAL_SERVER_ERROR,
                MESSAGE.NET_ERROR,
                '',
                error,
            );
        }
    }
    async delete(id: string) {
        try {
            const resualt_delete_category = await this.deleteCategoryService.execute(id)
            if (resualt_delete_category) {
                return response(RESULT.TRUE, HttpStatus.OK, MESSAGE.DELETE_SUCCESS);
            } else {
                return response(RESULT.FALSE, HttpStatus.BAD_REQUEST, MESSAGE.CANT_DELETE);
            }
        } catch (error) {

        }
    }
}

