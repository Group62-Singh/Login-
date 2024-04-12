import { DataSource } from 'typeorm';
import { cwd } from 'process';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: cwd() + '/db.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: true,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
