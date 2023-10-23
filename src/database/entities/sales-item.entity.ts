import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductEntity } from './product.entity';
import { SalesEntity } from './sales.entity';
@Entity({
  name: 'sales_item',
})
export class SalesItemEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => SalesEntity, sale => sale.saleItems)
    sale: SalesEntity;
  
    @ManyToOne(() => ProductEntity, product => product.saleItems)
    product: ProductEntity;
  
    @Column()
    quantity: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;
}
