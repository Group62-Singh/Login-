import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { User } from 'src/users/user.entity';
//import { User } from '../users/user.entity';

@Entity()
export class FuelRequest extends BaseEntity {
  @Column()
  gallons: number;

  @Column()
  deliveryAddress: string;

  @Column()
  deliveryDate: Date;

  @Column()
  price: number;

  @ManyToOne(() => User, (u) => u.fuelRequests)
  user: User;
}
