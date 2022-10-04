import { Module } from '@nestjs/common';
import { RequestsService } from './services/requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestsRepository } from './respositories/requests.repository';
import { AuthenticationModule } from '../../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([Request])],
  providers: [RequestsRepository, RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
