import { Column, CreateDateColumn, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';
@Entity({
    name: 'category',
})
export class CategoryEntity extends DefaultEntity {
    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}