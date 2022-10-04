import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  UsePipes,
  Query,
  Req,
} from '@nestjs/common';
import { CreateRequestDto } from './dtos/create-request.dto';
import { RequestsService } from './services/requests.service';
import { JoiValidationPipe } from 'src/common/validator/joi-validation.pipe';
import { RequestPayloadSchema } from './validator/request.schema-validator';
import { QueryRequestDto } from './dtos/query-request.dto';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthUser } from '../../common/interfaces/keycloak/keycloak-user.interface';

@Controller()
export class RequestsController {
  constructor(
    private requestsService: RequestsService,
    private authService: AuthenticationService,
  ) {}

  @Post('/requests')
  @UsePipes(new JoiValidationPipe(RequestPayloadSchema))
  async PostRequest(
    @Body() createRequestDto: CreateRequestDto,
    @Req() req,
    @Res() res,
  ): Promise<any> {
    const authUser = req.user as AuthUser;

    const userAccess = this.authService.getUserAccess(authUser);
    this.requestsService.createNewRequest(createRequestDto, userAccess);

    return res.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }

  @Get('/requests')
  async GetRequests(
    @Query() queryRequest: QueryRequestDto,
    @Req() req,
    @Res() res,
  ): Promise<any> {
    const authUser = req.user as AuthUser;
    const userAccess = this.authService.getUserAccess(authUser);
    const apiResponse = await this.requestsService.getAllRequests(
      queryRequest,
      userAccess,
    );

    return res.status(HttpStatus.OK).send(apiResponse);
  }
}
