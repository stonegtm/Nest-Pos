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

  @Column()
  category_id: string;

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  files?: ProductImageEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => SalesItemEntity, saleItem => saleItem.product)
  saleItems: SalesItemEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
