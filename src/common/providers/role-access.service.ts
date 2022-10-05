import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../config/app/config.service';
import { RoleAccess } from '../interfaces/role-access.interface';

@Injectable()
export class RoleAccessService {
  constructor(private appConfigService: AppConfigService) {}

  private _setRoleAccess(): RoleAccess {
    return {
      ADMIN: this.appConfigService.roleAdmin,
      USER: this.appConfigService.roleUser,
    };
  }

  getRole(): RoleAccess {
    const roleAccess = this._setRoleAccess();
    return roleAccess;
  }
}
