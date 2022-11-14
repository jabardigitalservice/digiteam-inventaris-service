import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from 'src/common/interfaces/keycloak-user.interface';
import { AuthenticationsService } from './authentications.service';

@Controller('authentications')
export class AuthenticationsController {
  constructor(private usersService: AuthenticationsService) {}

  @Get('/profile')
  async GetRequests(
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ) {
    const profile = this.usersService.getProfile(authUser);

    return res.status(HttpStatus.OK).send(profile);
  }
}
