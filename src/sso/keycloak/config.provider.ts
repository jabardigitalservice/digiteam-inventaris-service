import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private configService: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get('keycloak.authServer'),
      realm: this.configService.get('keycloak.realm'),
      clientId: this.configService.get('keycloak.clientId'),
      secret: this.configService.get('keycloak.secret'),
    };
  }
}
