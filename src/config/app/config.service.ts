import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get('app.APP_ENV');
  }

  get name(): string {
    return this.configService.get('app.APP_NAME');
  }

  get url(): string {
    return this.configService.get('app.APP_URL');
  }

  get port(): number {
    return Number(this.configService.get('app.APP_PORT'));
  }

  get keycloakServer(): string {
    return this.configService.get('app.KEYCLOAK_AUTH_SERVER_URL');
  }

  get keycloakRealm(): string {
    return this.configService.get('app.KEYCLOAK_REALM');
  }

  get keycloakClientId(): string {
    return this.configService.get('app.KEYCLOAK_CLIENT_ID');
  }

  get keycloakSecret(): string {
    return this.configService.get('app.KEYCLOAK_SECRET');
  }
}
