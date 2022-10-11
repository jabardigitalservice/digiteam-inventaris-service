import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedUser } from 'nest-keycloak-connect';

@Controller()
export class UsersController {
  @Get('users/profile')
  async GetRequests(
    @AuthenticatedUser() authUser,
    @Res() res: Response,
  ): Promise<any> {
    const profile = {
      name: authUser.name,
      email: authUser.email,
    };

    return res.status(HttpStatus.OK).send(profile);
  }
}
