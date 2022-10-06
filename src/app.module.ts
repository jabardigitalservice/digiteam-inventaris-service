import { Module } from '@nestjs/common';
import { RequestsModule } from './modules/requests/requests.module';
import { KeycloakConfigModule } from './config/sso/keycloak/config.module';
import { ExceptionModule } from './common/exceptions/exception.module';
import { MysqlConfigModule } from './config/database/mysql/config.module';
@Module({
  imports: [
    ExceptionModule,
    MysqlConfigModule,
    KeycloakConfigModule,
    RequestsModule,
  ],
})
export class AppModule {}
