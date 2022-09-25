import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from '../../app/config.service';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(private appConfigService: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.appConfigService.dbHost,
      port: this.appConfigService.dbPort,
      username: this.appConfigService.dbUsername,
      password: this.appConfigService.dbPassword,
      database: this.appConfigService.dbName,
      entities: ['./dist/src/models/**/entities/*.entity.js}'],
      autoLoadEntities: true,
      synchronize: false,
    };
  }
}
