import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { User } from '../users/user.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({ default: '' })
  fullName?: string;

  @Column({ default: '' })
  address1?: string;

  @Column({ default: '' })
  address2?: string;

  @Column({ default: '' })
  city?: string;

  @Column({ default: '' })
  state?: string;

  @Column({ default: '' })
  zipCode?: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
