import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert} from 'typeorm';
import { permission } from './permission.entity';
import * as bcrypt from 'bcryptjs';

@Entity('accounts')
export class account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  customer_name: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @ManyToOne(() => permission)
  @JoinColumn({ name: 'id_permission' })
  permission: permission;


  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword.substring(0, 20);
  }
}