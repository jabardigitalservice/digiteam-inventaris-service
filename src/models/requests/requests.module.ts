import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestsRepository } from './requests.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestsRepository, RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
