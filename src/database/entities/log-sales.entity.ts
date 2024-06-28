import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SalesItemEntity } from './sales-item.entity';
import { DefaultEntity } from './default.entity';
import { SalesEntity } from './sales.entity';

@Entity({
  name: 'log-sales',
})
export class LogSaleEntity extends DefaultEntity {
  @Column('text', { nullable: true })
  detail: string;

  @OneToOne(() => SalesEntity, (sale) => sale)
  @JoinColumn({ name: 'sales_id' })
  sales: SalesEntity;
}
