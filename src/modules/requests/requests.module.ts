import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../../entities/request.entity';
import { RequestsRepository } from './requests.repository';
import { KeycloakRolesService } from '../../providers/sso/keycloak/roles.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [
    ConfigService,
    RequestsRepository,
    RequestsService,
    KeycloakRolesService,
  ],
  controllers: [RequestsController],
})
export class RequestsModule {}
