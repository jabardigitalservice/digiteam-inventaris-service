import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RoleAccess } from '../../common/interfaces/role-access.interface';
import {
  AuthUser,
  UserAccess,
} from '../../common/interfaces/keycloak-user.interface';

@Injectable()
export class KeycloakRolesService {
  constructor(private configService: ConfigService) {}

  private setRoleAccess(): RoleAccess {
    return {
      ADMIN: this.configService.get('roles.role0'),
      USER: this.configService.get('roles.role1'),
    };
  }

  getRoles(): RoleAccess {
    const roleAccess = this.setRoleAccess();
    return roleAccess;
  }

  getUserAccess(authUser: AuthUser): UserAccess {
    const role = authUser.realm_access.roles.map((role) => role);

    const roleAccess = this.getRoles();
    const isAdmin = authUser.realm_access.roles.includes(roleAccess.ADMIN);

    return {
      name: authUser.name,
      email: authUser.email,
      role: role,
      isAdmin: isAdmin,
    };
  }
}
