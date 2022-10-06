import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get('app.env') === 'production';

    return {
      type: 'mysql',
      host: this.configService.get('mysql.host'),
      port: this.configService.get('mysql.port'),
      username: this.configService.get('mysql.username'),
      password: this.configService.get('mysql.password'),
      database: this.configService.get('mysql.database'),
      autoLoadEntities: true,
      synchronize: !isProduction,
    };
  }
}
