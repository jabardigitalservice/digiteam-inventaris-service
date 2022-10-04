import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../config/app/config.service';
import { RoleAccess } from '../interfaces/role-access.interface';

@Injectable()
export class RoleAccessService {
  private _role: RoleAccess;

  constructor(private appConfigService: AppConfigService) {
    this._role = this.setRoleAccess();
  }

  getAdminRole() {
    return this._role.ADMIN;
  }

  getUserRole() {
    return this._role.USER;
  }

  setRoleAccess(): RoleAccess {
    return {
      ADMIN: this.appConfigService.roleAdmin,
      USER: this.appConfigService.roleUser,
    };
  }
}
