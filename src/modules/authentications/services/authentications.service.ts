import { Injectable } from '@nestjs/common';
import {
  AuthUser,
  UserAccess,
} from 'src/common/interfaces/keycloak-user.interface';
import { UserAccessService } from '../../../common/providers/user-access.service';
import { ApiResponse } from '../../../common/interfaces/api-response.interface';

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
