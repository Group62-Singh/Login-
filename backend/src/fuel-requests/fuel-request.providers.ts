import { DataSource } from 'typeorm';
import { FuelRequest } from './fuel-request.entity';

export const FUEL_REQUEST_REPOSITORY = 'FUEL_REQUEST_REPOSITORY';

export const fuelRequestProviders = [
  {
    provide: FUEL_REQUEST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FuelRequest),
    inject: ['DATA_SOURCE'],
  },
];
