import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'inventaris-mysql-db',
  entities: ['src/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['src/**/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
