import { Module } from '@nestjs/common';
import { RequestsModule } from './modules/requests/requests.module';
import { KeycloakConfigModule } from './config/sso/keycloak/config.module';
import { ExceptionModule } from './common/exceptions/exception.module';
import { MysqlConfigModule } from './config/database/mysql/config.module';
import { AuthenticationsModule } from './modules/authentications/authentications.module';
import { FilesModule } from './modules/files/files.module';
@Module({
  imports: [
    ExceptionModule,
    MysqlConfigModule,
    KeycloakConfigModule,
    RequestsModule,
    AuthenticationsModule,
    FilesModule,
  ],
})
export class AppModule {}
