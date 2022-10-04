import { Global, Module } from '@nestjs/common';
import { KeycloakConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '../../app/config.service';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakConfigModule],
    }),
  ],
  providers: [
    AppConfigService,
    KeycloakConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [AppConfigService, KeycloakConfigService],
})
export class KeycloakConfigModule {}
