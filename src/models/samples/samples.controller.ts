import { Controller, Get } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';

@Controller('v1')
export class SamplesController {
  @Get('/requests')
  @Roles({ roles: ['admin'] })
  getGoods(): string {
    return 'list of goods request';
  }

  @Get('/samples')
  @Unprotected()
  getPublic(): string {
    return 'samples';
  }
}
