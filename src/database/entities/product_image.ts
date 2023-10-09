import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { ProductEntity } from './product.entity';
@Entity({
    name: 'product_image',
})
export class ProductImageEntity extends DefaultEntity {
    @Column()
    image_name: string;

    @Column()
    image_url: string;

    @Column()
    image_type: string;

    @ManyToOne(() => ProductEntity, (Column) => Column.files)
    product?: ProductEntity;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}