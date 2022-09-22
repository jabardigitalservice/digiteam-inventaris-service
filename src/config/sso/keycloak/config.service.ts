import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../app/config.service';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private appConfigService: AppConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.appConfigService.keycloakServer,
      realm: this.appConfigService.keycloakRealm,
      clientId: this.appConfigService.keycloakClientId,
      secret: this.appConfigService.keycloakSecret,
    };
  }
}
