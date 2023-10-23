import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../database/entities/product.entity';
import { ProductImageEntity } from '../../database/entities/product_image';
import { ProductDto } from '../../modules/product/dto/product.dto';
@Injectable()
export class ProductRepositoryService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}
  async save(body: ProductEntity) {
    const entity = await this.productRepository.save(body);
    return entity;
  }
  async saveImage(bodyImage: ProductImageEntity) {
    const entity = await this.productImageRepository.save(bodyImage);
    return entity;
  }
  async findOne(id: string) {
    const findOne = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        files: true,
      },
    });
    return findOne;
  }
  async update(id: string, body: ProductDto) {
    const update_product = await this.productRepository.update(id, body);
    return update_product;
  }
  async findAllProductByCategory(id) {
    const product = await this.productRepository.find({
      where: id ? { category_id: id } : null,
      relations: {
        files: true,
      },
      order: {
        name: 'asc',
      },
    });
    product.map((data: any, index) => {
      data.key = index + 1;
    });
    return product;
  }
  async delete(id: string) {
    const delete_category = await this.productRepository.delete(id);
    return delete_category;
  }
  async deleteImage(img_name: string) {
    const delete_category = await this.productImageRepository.delete({
      image_name: img_name,
    });
    return delete_category;
  }
  async updateStock(id: string, quantity: number) {
    const data = { quantity: quantity };
    await this.productRepository.update(id, data);
    return true;
  }
}
