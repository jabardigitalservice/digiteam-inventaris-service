import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Unprotected } from 'nest-keycloak-connect';
import { RequestsService } from './requests.service';
import { JoiValidationPipe } from 'src/common/validator/joi-validation.pipe';
import { RequestPayloadSchema } from './validator/request.schema-validator';

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
}
