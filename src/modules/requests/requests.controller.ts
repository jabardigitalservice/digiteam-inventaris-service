import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestsService } from './services/requests.service';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import {
  RequestPaginationSchema,
  CreateRequestPayloadSchema,
} from './rules/request.schema-validator';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from '../../common/interfaces/keycloak-user.interface';
import { UserAccessService } from './../../common/providers/user-access.service';
import { CreateRequest } from './interfaces/request.interface';
import { QueryPagination } from '../../common/interfaces/pagination.interface';

@Controller()
export class RequestsController {
  constructor(
    private requestsService: RequestsService,
    private userAccessService: UserAccessService,
  ) {}

  @Post('/requests')
  async PostRequest(
    @Body(new JoiValidationPipe(CreateRequestPayloadSchema))
    createRequest: CreateRequest,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    this.requestsService.createNewRequest(createRequest, userAccess);

    return res.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }

  @Get('/requests')
  async GetRequests(
    @Query(new JoiValidationPipe(RequestPaginationSchema))
    queryPagination: QueryPagination,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);

    const apiResponse = await this.requestsService.getAllRequests(
      queryPagination,
      userAccess,
    );

    return res.status(HttpStatus.OK).send(apiResponse);
  }
}
