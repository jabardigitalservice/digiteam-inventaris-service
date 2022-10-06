import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { KeycloakConfigService } from './config.provider';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from 'src/config/app/config.module';

@Global()
@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [AppConfigModule],
      useClass: KeycloakConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [
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
})
export class KeycloakConfigModule {}
