import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { UpdateResult } from 'typeorm';
import { ENV } from '../../common/env/env';
import { ProductEntity } from '../../database/entities/product.entity';
import { ProductImageEntity } from '../../database/entities/product_image';
import { ProductDto } from '../../modules/product/dto/product.dto';
import { ProductRepositoryService } from '../../respositories/product-respository/product-respository.service';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
  ) {}

  async execute(
    files,
    payload: ProductDto,
    id: string,
  ): Promise<{
    updateResult: UpdateResult;
    updatedProduct: ProductEntity;
  }> {
    try {
      // console.log('files', files);
      // console.log('>>>>>>>>>>>>>>>>>>>', payload);
      if (payload.image_delete) {
        const dataArray = payload.image_delete?.split(',');
        // console.log(dataArray);
        dataArray?.map((data) => {
          const filePath = `../files/` + data; // Replace with the actual path to the file you want to remove
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting the file:', err);
            } else {
              console.log('File has been deleted successfully');
              this.productRepositoryService.deleteImage(data);
            }
          });
        });
      }
      delete payload.image_delete;
      const existingCategory = await this.productRepositoryService.findOne(id);
      if (!existingCategory) {
        throw new NotFoundException('Product not found'); // Throw a 404 error if the category doesn't exist
      }

      const updateResult = await this.productRepositoryService.update(
        id,
        payload,
      );
      for (const file of files) {
        const img_path = `${gen_uuid().toString()}.${
          file.mimetype.split('/')[1]
        }`;
        fs.writeFileSync(`../files/` + img_path, file.buffer);
        const productImageEntity = new ProductImageEntity();
        productImageEntity.image_name = img_path;
        productImageEntity.image_type = file.mimetype;
        productImageEntity.image_url = ENV().URL_API + img_path;
        productImageEntity.product = existingCategory;
        await this.productRepositoryService.saveImage(productImageEntity);
      }
      // Fetch the updated entity separately
      const updatedProduct = await this.productRepositoryService.findOne(id);

      return { updateResult, updatedProduct };
    } catch (error) {
      // Handle any error that occurred during the save operation
      console.error(error); // Log the error for debugging
      throw new Error('Failed to save the category.'); // You can customize the error message
    }
  }
}
export const gen_uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
