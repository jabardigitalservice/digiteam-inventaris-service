import { Module } from '@nestjs/common';
import { RoleAccessService } from 'src/common/providers/role-access.service';
import { UserAccessService } from 'src/common/providers/user-access.service';

import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';

@Module({
  providers: [RoleAccessService, UserAccessService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
