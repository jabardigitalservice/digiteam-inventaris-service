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
import { RequestsService } from './requests.service';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import {
  GetRequestsSchema,
  CreateRequestPayloadSchema,
  ChangeRequestPayloadSchema,
  PatchRequestItemPayloadSchema,
} from './rules/request.schema-validator';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from '../../common/interfaces/keycloak-user.interface';
import { UserAccessService } from './../../common/providers/user-access.service';
import {
  ChangeStatusBody,
  CreateRequestBody,
  UpdateRequestItemBody,
} from './requests.interface';
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
    this.requestsService.create(createRequestBody, userAccess);

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

    const apiResponse = await this.requestsService.fetch(
      queryPagination,
      userAccess,
    );

    return res.status(HttpStatus.OK).send(apiResponse);
  }

  @Get(':id')
  async GetRequest(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const apiResponse = await this.requestsService.findById(id);

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

  @Patch(':id')
  async PutRequestItem(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(PatchRequestItemPayloadSchema))
    updateRequestItemBody: UpdateRequestItemBody,
    @Res() res: Response,
  ): Promise<any> {
    await this.requestsService.updateAvailableItem(updateRequestItemBody, id);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }
}
