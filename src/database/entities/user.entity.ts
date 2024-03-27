import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends DefaultEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  role: string;
}
