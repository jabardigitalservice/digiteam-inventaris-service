import { Module } from '@nestjs/common';
import { RequestsModule } from './modules/requests/requests.module';
import { KeycloakClientModule } from './providers/sso/keycloak/keycloak.module';
import { ExceptionModule } from './common/exceptions/exception.module';
import { MysqlClientModule } from './database/mysql/mysql.module';
import { AuthenticationsModule } from './modules/authentications/authentications.module';
import { FilesModule } from './modules/files/files.module';
@Module({
  imports: [
    ExceptionModule,
    MysqlClientModule,
    KeycloakClientModule,
    RequestsModule,
    AuthenticationsModule,
    FilesModule,
  ],
})
export class AppModule {}
