import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductEntity } from './product.entity';

@Entity({
  name: 'category',
})
export class CategoryEntity extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  description?: string;

}
