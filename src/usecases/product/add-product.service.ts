import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ENV } from '../../config/env/env';
import { ProductEntity } from '../../database/entities/product.entity';
import { ProductImageEntity } from '../../database/entities/product_image';
import { ProductDto } from '../../modules/product/dto/product.dto';
import { ProductRepositoryService } from '../../respositories/product-respository/product-respository.service';
import { CategoryRepositoryService } from 'src/respositories/category-respository/category-respository.service';

@Injectable()
export class AddProductService {
  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
    private readonly categoryRepositoryService: CategoryRepositoryService,
  ) {}

  async execute(files, payload: ProductDto): Promise<ProductEntity> {
    try {
      if (!payload.category_id) {
        throw new Error('Invalid categoy.');
      }
      const category_arr = JSON.parse(payload.category_id);

      const productData = new ProductEntity();
      productData.name = payload.name;
      productData.description = payload.description;
      productData.quantity = payload?.quantity || 0;
      productData.unit = payload.unit;
      productData.price = payload.price;
      const product = await this.productRepositoryService.save(productData);
      category_arr.map(async (data) => {
        let category = await this.categoryRepositoryService.findOne(data);
        if (!category) {
          throw new Error('Invalid categoy.');
        }
        let keepProductToCategory = {
          product: product,
          category: category,
        };
        await this.productRepositoryService.saveProductKeepCategory(
          keepProductToCategory,
        );
      });

      for (const file of files) {
        const img_path = `${gen_uuid().toString()}.${
          file.mimetype.split('/')[1]
        }`;
        fs.writeFileSync(`../files/` + img_path, file.buffer);
        const productImageEntity = new ProductImageEntity();
        productImageEntity.image_name = img_path;
        productImageEntity.image_type = file.mimetype;
        productImageEntity.image_url = ENV().URL_API + img_path;
        productImageEntity.product = product;
        // console.log('=====================.>>>>>>>>>>>>>>', productImageEntity)
        await this.productRepositoryService.saveImage(productImageEntity);
      }
      return product;
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
