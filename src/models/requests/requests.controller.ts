import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Unprotected } from 'nest-keycloak-connect';
import { RequestsService } from './requests.service';
import { RequestPayloadSchema } from './validator/request.schema-validator';

@Controller()
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post('/requests')
  @Unprotected()
  @UsePipes(RequestPayloadSchema)
  async PostRequest(
    @Body() createRequestDto: CreateRequestDto,
    @Res() response,
  ): Promise<any> {
    this.requestsService.create({ ...createRequestDto });

    return response.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }

  @Get('/requests')
  @Unprotected()
  async GetRequests(@Res() response): Promise<Request[]> {
    const requests = await this.requestsService.findAll();

    return response.status(HttpStatus.OK).send({
      data: requests,
    });
  }
}
