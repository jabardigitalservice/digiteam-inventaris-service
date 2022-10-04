import { Module } from '@nestjs/common';
import { MysqlDatabaseModule } from './database/mysql/database.module';
import { RequestsModule } from './modules/requests/requests.module';
import { KeycloakConfigModule } from './config/sso/keycloak/config.module';
import { ExceptionModule } from './common/exceptions/exception.module';
@Module({
  imports: [
    ExceptionModule,
    MysqlDatabaseModule,
    KeycloakConfigModule,
    RequestsModule,
  ],
})
export class AppModule {}
