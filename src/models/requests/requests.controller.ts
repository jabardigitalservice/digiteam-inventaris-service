import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  UsePipes,
  Query,
} from '@nestjs/common';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Unprotected } from 'nest-keycloak-connect';
import { RequestsService } from './requests.service';
import { JoiValidationPipe } from 'src/common/validator/joi-validation.pipe';
import { RequestPayloadSchema } from './validator/request.schema-validator';
import { GetRequestsPaginateDto } from './dtos/get-requests-paginate.dto';
// import { metaPaginate } from 'src/common/helper/pagaination.helper';

@Controller()
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Post('/requests')
  @Unprotected()
  @UsePipes(new JoiValidationPipe(RequestPayloadSchema))
  async PostRequest(
    @Body() createRequestDto: CreateRequestDto,
    @Res() response,
  ): Promise<any> {
    this.requestsService.createNewRequest(createRequestDto);

    return response.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }

  @Get('/requests')
  @Unprotected()
  async GetRequests(
    @Query() getRequestsPaginate: GetRequestsPaginateDto,
    @Res() response,
  ): Promise<any> {
    const apiResponse = await this.requestsService.getAllRequests(
      getRequestsPaginate,
    );

    return response.status(HttpStatus.OK).send(apiResponse);
  }
}
