// product.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductImageEntity } from './product_image';
import { CategoryEntity } from './category.entity';
import { SalesItemEntity } from './sales-item.entity';
import { CategoryKeepProductEntity } from './category-keep-product';

@Entity({
  name: 'products',
})
export class ProductEntity extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  // Define the relation with CategoryKeepProductEntity
  @OneToMany(
    () => CategoryKeepProductEntity,
    (categoryKeepProduct) => categoryKeepProduct.product,
  )
  categoryConnections: CategoryKeepProductEntity[];
  // @ManyToOne(() => CategoryEntity, category => category.products) // Link to CategoryEntity
  // @JoinColumn({ name: 'category_id' }) // Map to the external key column
  // category: CategoryEntity;

  @Column({ nullable: true })
  unit: string;

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  files?: ProductImageEntity[];

  @OneToMany(() => SalesItemEntity, (saleItem) => saleItem.product)
  saleItems: SalesItemEntity[];
}
