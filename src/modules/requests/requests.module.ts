import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RequestsService } from './services/requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { RequestsRepository } from './respositories/requests.repository';
import { UserAccessService } from '../../common/providers/user-access.service';
import { RoleAccessService } from '../../common/providers/role-access.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [
    ConfigService,
    RequestsRepository,
    RequestsService,
    RoleAccessService,
    UserAccessService,
  ],
  controllers: [RequestsController],
})
export class RequestsModule {}
