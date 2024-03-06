import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SalesItemEntity } from './sales-item.entity';

enum PaymentMethod {
  Cash = 'Cash',
  Banking = 'Banking',
}
@Entity({
  name: 'sales',
})
export class SalesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  saleDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalSumAll: number;

  @Column('decimal', { precision: 10, scale: 2 })
  discount: number; // Add this line for the discount

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.Cash, // Default value if needed
  })
  @Column('text', { nullable: true })
  notes: string;

  @OneToMany(() => SalesItemEntity, (saleItem) => saleItem.sale)
  saleItems: SalesItemEntity[];
}
