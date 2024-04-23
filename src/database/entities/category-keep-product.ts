import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from './category.entity';
@Entity({
  name: 'category_keep_product',
})
export class CategoryKeepProductEntity extends DefaultEntity {
  @ManyToOne(() => ProductEntity, (product) => product.categoryConnections)
  product: ProductEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.productConnections)
  category: CategoryEntity;
}
