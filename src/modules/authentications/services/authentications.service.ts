import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  AuthUser,
  UserAccess,
} from 'src/common/interfaces/keycloak-user.interface';
import { UserAccessService } from 'src/common/providers/user-access.service';

@Injectable()
export class AuthenticationsService {
  constructor(private userAccessService: UserAccessService) {}

  getProfile(authUser: AuthUser) {
    const userAccess = this.userAccessService.getUserAccess(authUser);

    const data: UserAccess = {
      name: userAccess.name,
      email: userAccess.email,
      isAdmin: userAccess.isAdmin,
    };

    const apiResponse: ApiResponse = {
      data,
    };

    return apiResponse;
  }
}
