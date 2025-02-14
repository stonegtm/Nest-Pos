import { HttpStatus, Injectable } from '@nestjs/common';
import { RESULT } from '../../constants';
import { MESSAGE } from '../../constants/messages';
import { response } from '../../shared/response';
import { AddProductService } from '../../usecases/product/add-product.service';
import { DeleteProductService } from '../../usecases/product/delete-category.service';
import { FindAllProductService } from '../../usecases/product/find-all-product.service';
import { FindOneProductService } from '../../usecases/product/find-one-product.service';
import { UpdateProductService } from '../../usecases/product/update-product.service';
import { UpdateStockService } from '../../usecases/product/update-stock.service';
import { ProductDto, ProductUpdateStockDto } from './dto/product.dto';
import { GetProductByCategoryService } from 'src/usecases/product/get-product-by-category/get-product-by-category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly addProductService: AddProductService,
    private readonly findAllProductService: FindAllProductService,
    private readonly findOneProductService: FindOneProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly updateStockService: UpdateStockService,
    private readonly getProductByCategoryService: GetProductByCategoryService,
  ) {}
  async create(files: Array<Express.Multer.File>, product: ProductDto) {
    try {
      const result_create_product = await this.addProductService.execute(
        files,
        product,
      );
      if (result_create_product.id) {
        return response(RESULT.TRUE, HttpStatus.CREATED, MESSAGE.SUCCESS);
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
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
  async findAll(category_id) {
    try {
      const result_create_product =
        await this.findAllProductService.execute(category_id);
      if (result_create_product) {
        return response(
          RESULT.TRUE,
          HttpStatus.OK,
          MESSAGE.SUCCESS,
          result_create_product,
        );
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
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
  async findOne(product_id) {
    try {
      const result_create_product =
        await this.findOneProductService.execute(product_id);
      if (result_create_product) {
        return response(
          RESULT.TRUE,
          HttpStatus.OK,
          MESSAGE.SUCCESS,
          result_create_product,
        );
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
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
  async getProductTab() {
    try {
      const produc_tab =
        await this.getProductByCategoryService.execute();
      if (produc_tab) {
        return response(
          RESULT.TRUE,
          HttpStatus.OK,
          MESSAGE.SUCCESS,
          produc_tab,
        );
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
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
  async update(
    files: Array<Express.Multer.File>,
    product: ProductDto,
    id: string,
  ) {
    try {
      const result_update_product = await this.updateProductService.execute(
        files,
        product,
        id,
      );
      if (result_update_product) {
        return response(RESULT.TRUE, HttpStatus.OK, MESSAGE.SUCCESS);
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.ERROR_SAVE,
        );
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
      const resualt_delete_product: any =
        await this.deleteProductService.execute(id);
      if (resualt_delete_product) {
        return response(RESULT.TRUE, HttpStatus.OK, MESSAGE.DELETE_SUCCESS);
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.CANT_DELETE,
        );
      }
    } catch (error) {}
  }
  async updateStock(body: ProductUpdateStockDto) {
    try {
      const resulat_update_stock: any =
        await this.updateStockService.execute(body);
      if (resulat_update_stock.status) {
        return response(RESULT.TRUE, HttpStatus.OK, MESSAGE.UPDATE_STOCK);
      } else {
        return response(
          RESULT.FALSE,
          HttpStatus.BAD_REQUEST,
          MESSAGE.UPDATE_STOCK_FAILED,
        );
      }
    } catch (error) {
      return response(
        RESULT.FALSE,
        HttpStatus.BAD_REQUEST,
        MESSAGE.CANT_DELETE,
      );
    }
  }
}
