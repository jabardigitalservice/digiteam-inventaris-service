import { Injectable } from '@nestjs/common';
import { AuthUser, UserAccess } from '../interfaces/keycloak-user.interface';
import { RoleAccessService } from './role-access.service';

@Injectable()
export class UserAccessService {
  constructor(private roleAccessService: RoleAccessService) {}

  getUserAccess(authUser: AuthUser): UserAccess {
    const role = authUser.realm_access.roles.map((role) => role);
    const isAdmin = authUser.realm_access.roles.includes(
      this.roleAccessService.getAdminRole(),
    );

    return {
      name: authUser.name,
      email: authUser.email,
      role: role,
      isAdmin: isAdmin,
    };
  }
}
