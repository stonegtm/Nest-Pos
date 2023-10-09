import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductEntity } from './product.entity';
@Entity({
    name: 'sales',
})
export class SalesEntity extends DefaultEntity {
    @Column()
    product_id: string;

    @Column()
    quantity: number;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    unit_price: number;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    total_price: number;

    @OneToMany(() => ProductEntity, (Column) => Column.id)
    product?: ProductEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}