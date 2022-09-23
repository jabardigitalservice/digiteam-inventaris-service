import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requests } from './entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requests])],
  providers: [RequestsService],
  controllers: [RequestsController],
})
export class RequestsModule {}
