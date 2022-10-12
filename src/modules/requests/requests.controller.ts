import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  Query,
  Patch,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestsService } from './services/requests.service';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import {
  GetRequestsSchema,
  CreateRequestPayloadSchema,
  ChangeRequestPayloadSchema,
} from './rules/request.schema-validator';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from '../../common/interfaces/keycloak-user.interface';
import { UserAccessService } from './../../common/providers/user-access.service';
import {
  ChangeStatusBody,
  CreateRequestBody,
} from './interfaces/request.interface';
import { QueryPagination } from '../../common/interfaces/pagination.interface';

@Controller('requests')
export class RequestsController {
  constructor(
    private requestsService: RequestsService,
    private userAccessService: UserAccessService,
  ) {}

  @Post()
  async PostRequest(
    @Body(new JoiValidationPipe(CreateRequestPayloadSchema))
    createRequestBody: CreateRequestBody,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    this.requestsService.createNewRequest(createRequestBody, userAccess);

    return res.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }

  @Get()
  async GetRequests(
    @Query(new JoiValidationPipe(GetRequestsSchema))
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

  @Patch(':id/status')
  async PutRequestStatus(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(ChangeRequestPayloadSchema))
    changeStatusBody: ChangeStatusBody,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    if (!userAccess.isAdmin) {
      throw new UnauthorizedException();
    }

    this.requestsService.changeStatus(changeStatusBody, id);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }
}
