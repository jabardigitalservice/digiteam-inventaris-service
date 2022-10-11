import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from 'src/common/interfaces/keycloak-user.interface';
import { UsersService } from './services/users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users/profile')
  async GetRequests(
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ) {
    const profile = await this.usersService.getProfile(authUser);

    return res.status(HttpStatus.OK).send(profile);
  }
}
