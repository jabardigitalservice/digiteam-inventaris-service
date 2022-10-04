import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../config/app/config.service';
import { RoleAccess } from '../interfaces/keycloak/role-access.interface';

@Injectable()
export class RoleAccessService {
  public role: RoleAccess;

  constructor(private appConfigService: AppConfigService) {
    this.role = this.getRoleAccess();
  }

  getRoleAccess(): RoleAccess {
    return {
      ADMIN: this.appConfigService.roleAdmin,
      USER: this.appConfigService.roleUser,
    };
  }
}
