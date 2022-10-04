import { Injectable } from '@nestjs/common';
import {
  AuthUser,
  UserAccess,
} from '../common/interfaces/keycloak/keycloak-user.interface';
import { RoleAccessService } from '../common/providers/role-access.service';

@Injectable()
export class AuthenticationService {
  constructor(private roleAccessService: RoleAccessService) {}

  getUserAccess(authUser: AuthUser): UserAccess {
    const role = authUser.realm_access.roles.map((role) => role);
    const isAdmin = authUser.realm_access.roles.includes(
      this.roleAccessService.roleAccess.ADMIN,
    );

    return {
      name: authUser.name,
      email: authUser.email,
      role: role,
      isAdmin: isAdmin,
    };
  }
}
