import { Module } from '@nestjs/common';
import { MysqlDatabaseModule } from './database/mysql/database.module';
import { RequestsModule } from './modules/requests/requests.module';
import { HttpExceptionFilter } from './common/exceptions/http-error.filter';
import { APP_FILTER } from '@nestjs/core';
import { KeycloakConfigModule } from './config/sso/keycloak/config.module';

@Module({
  imports: [KeycloakConfigModule, RequestsModule, MysqlDatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
