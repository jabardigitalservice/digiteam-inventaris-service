import { Injectable } from '@nestjs/common';
import {
  AuthUser,
  UserAccess,
} from 'src/common/interfaces/keycloak-user.interface';
import { UserAccessService } from 'src/common/providers/user-access.service';

@Injectable()
export class UsersService {
  constructor(private userAccessService: UserAccessService) {}

  async getProfile(authUser: AuthUser) {
    const userAccess = this.userAccessService.getUserAccess(authUser);

    const profile: UserAccess = {
      name: userAccess.name,
      email: userAccess.email,
      isAdmin: userAccess.isAdmin,
    };

    return profile;
  }
}
