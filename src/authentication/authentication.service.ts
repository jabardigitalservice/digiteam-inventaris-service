import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../config/app/config.service';
import {
  AuthUser,
  UserAccess,
} from '../common/interfaces/keycloak/keycloak-user.interface';
import { RoleAccess } from '../common/interfaces/keycloak/role-access.interface';

@Injectable()
export class AuthenticationService {
  public roleAccess: RoleAccess;

  constructor(private appConfigService: AppConfigService) {
    this.roleAccess = this.getRoleAccess();
  }

  getRoleAccess(): RoleAccess {
    return {
      ADMIN: this.appConfigService.roleAdmin,
      USER: this.appConfigService.roleUser,
    };
  }

  getUserAccess(authUser: AuthUser): UserAccess {
    const role = authUser.realm_access.roles.map((role) => role);
    const isAdmin = authUser.realm_access.roles.includes(this.roleAccess.ADMIN);

    return {
      name: authUser.name,
      email: authUser.email,
      role: role,
      isAdmin: isAdmin,
    };
  }
}
