import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  AuthUser,
  UserAccess,
} from 'src/common/interfaces/keycloak-user.interface';
import { KeycloakRolesService } from 'src/sso/keycloak/roles.provider';

@Injectable()
export class AuthenticationsService {
  constructor(private rolesService: KeycloakRolesService) {}

  getProfile(authUser: AuthUser) {
    const userAccess = this.rolesService.getUserAccess(authUser);

    const data: UserAccess = {
      name: userAccess.name,
      email: userAccess.email,
      isAdmin: userAccess.isAdmin,
    };

    const apiResponse: ApiResponse = {
      data,
    };

    return apiResponse;
  }
}
