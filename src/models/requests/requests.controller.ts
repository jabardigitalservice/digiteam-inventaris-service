import { Body, Controller, Post } from '@nestjs/common';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Unprotected } from 'nest-keycloak-connect';
import { RequestsService } from './requests.service';

@Controller()
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post('/requests')
  @Unprotected()
  PostRequest(@Body() createRequestDto: CreateRequestDto): void {
    this.requestsService.create(
      createRequestDto.request_type,
      createRequestDto.item_name,
      createRequestDto.purpose,
      createRequestDto.priority,
    );
  }
}
