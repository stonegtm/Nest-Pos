import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductImageEntity } from './product_image';
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

  @OneToMany(() => ProductImageEntity, (Column) => Column.product)
  files?: ProductImageEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
