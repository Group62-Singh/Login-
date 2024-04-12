import { DataSource } from 'typeorm';
import { Profile } from './profile.entity';

export const PROFILE_REPOSITORY = 'PROFILE_REPOSITORY';

export const profileProviders = [
  {
    provide: PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: ['DATA_SOURCE'],
  },
];
