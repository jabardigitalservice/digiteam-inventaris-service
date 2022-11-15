import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { KeycloakConnectModule, AuthGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from '../../config/config.module';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          authServerUrl: configService.get('keycloak.authServer'),
          realm: configService.get('keycloak.realm'),
          clientId: configService.get('keycloak.clientId'),
          secret: configService.get('keycloak.secret'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class KeycloakClientModule {}
