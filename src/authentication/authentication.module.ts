import { Module } from '@nestjs/common';
import { RoleAccessService } from '../common/providers/role-access.service';
import { AuthenticationService } from './authentication.service';
@Module({
  providers: [AuthenticationService, RoleAccessService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
