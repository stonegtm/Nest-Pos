import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductEntity } from './product.entity';
import { CategoryKeepProductEntity } from './category-keep-product';

@Entity({
  name: 'category',
})
export class CategoryEntity extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  description?: string;
  
  @Column({nullable:true})
  order_no?: number;

  @OneToMany(() => CategoryKeepProductEntity, categoryKeepProduct => categoryKeepProduct.category)
  productConnections?: CategoryKeepProductEntity[];
}
