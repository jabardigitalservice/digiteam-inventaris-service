import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RoleAccess } from '../interfaces/role-access.interface';

@Injectable()
export class RoleAccessService {
  constructor(private configService: ConfigService) {}

  private _setRoleAccess(): RoleAccess {
    return {
      ADMIN: this.configService.get('roles.role0'),
      USER: this.configService.get('roles.role1'),
    };
  }

  getRole(): RoleAccess {
    const roleAccess = this._setRoleAccess();
    return roleAccess;
  }
}
