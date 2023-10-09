import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesEntity } from '../../database/entities/sales.entity';
@Injectable()
export class SaleRepositoryService {
    constructor(
        @InjectRepository(SalesEntity)
        private readonly saleRepository: Repository<SalesEntity>,
    ) { }
    async save(body: SalesEntity) {
        const entity = await this.saleRepository.save(body);
        return entity
    }
    // async findOne(id: string) {
    //     const findOne = await this.productRepository.findOne({
    //         where: {
    //             id: id
    //         }
    //     });
    //     return findOne
    // }
    // async update(id: string, body: ProductDto) {
    //     const update_product = await this.productRepository.update(id, body);
    //     return update_product
    // }
    // async findAllProduct() {
    //     const product = await this.productRepository.find();
    //     return product
    // }
    // async delete(id: string) {
    //     const delete_category = await this.productRepository.delete(id);
    //     return delete_category
    // }
}
