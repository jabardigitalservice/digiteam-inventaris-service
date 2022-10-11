import { Module } from '@nestjs/common';
import { RoleAccessService } from 'src/common/providers/role-access.service';
import { UserAccessService } from 'src/common/providers/user-access.service';

import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './services/authentications.service';

@Module({
  providers: [RoleAccessService, UserAccessService, AuthenticationsService],
  controllers: [AuthenticationsController],
})
export class UsersService {}
