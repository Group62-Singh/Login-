import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Profile } from '../profiles/profile.entity';
import { FuelRequest } from '../fuel-requests/fuel-request.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  // @Column({ default: true })
  // firstLogin: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => FuelRequest, (f) => f.user)
  fuelRequests: FuelRequest[];
}
