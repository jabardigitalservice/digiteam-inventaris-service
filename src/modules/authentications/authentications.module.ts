import { Module } from '@nestjs/common';
import { KeycloakRolesService } from '../../providers/keycloak/roles.provider';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';

@Module({
  providers: [KeycloakRolesService, AuthenticationsService],
  controllers: [AuthenticationsController],
})
export class AuthenticationsModule {}
