import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../../../common/interfaces/keycloak-user.interface';
import { KeycloakRolesService } from './roles.provider';

@Injectable()
export class KeycloakRolesGuard implements CanActivate {
  constructor(private keycloakRolesService: KeycloakRolesService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(user);
  }

  matchRoles(authUser: AuthUser): boolean {
    const roleAccess = this.keycloakRolesService.getRoles();

    const isAdmin = authUser.realm_access.roles.includes(roleAccess.ADMIN);
    return isAdmin;
  }
}
