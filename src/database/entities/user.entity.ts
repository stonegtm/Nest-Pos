import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';
@Entity({
    name: 'users',
})
export class UserEntity extends DefaultEntity {
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10); // 10 is the number of bcrypt salt rounds
    }
}