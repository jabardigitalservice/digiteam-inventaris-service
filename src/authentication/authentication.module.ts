import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { ConfigModule } from '@nestjs/config';
import { KeycloakConfigModule } from '../config/sso/keycloak/config.module';
import { KeycloakConfigService } from '../config/sso/keycloak/config.service';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect'

import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule, KeycloakConfigModule]
    })
  ],
  controllers: [AuthenticationController],
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
  ]
})
export class AuthenticationModule {}
