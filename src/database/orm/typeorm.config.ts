import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

config();

const appConfigService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: appConfigService.get('MYSQL_HOST'),
  port: Number(appConfigService.get('MYSQL_PORT')),
  username: appConfigService.get('MYSQL_USERNAME'),
  password: appConfigService.get('MYSQL_PASSWORD'),
  database: appConfigService.get('MYSQL_DATABASE'),
  entities: ['./src/models/**/entities/*.entity.ts'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['./src/**/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
