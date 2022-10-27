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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { RequestsService } from './requests.service';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import {
  GetRequestsSchema,
  CreateRequestPayloadSchema,
  ChangeRequestPayloadSchema,
  PatchRequestItemPayloadSchema,
} from './requests.rules';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from '../../common/interfaces/keycloak-user.interface';
import { UserAccessService } from './../../common/providers/user-access.service';
import {
  ChangeStatusBody,
  CreateRequestBody,
  UpdateRequestItemBody,
} from './requests.interface';
import { QueryPagination } from '../../common/interfaces/pagination.interface';
import { MinioClientService } from '../../storage/minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/helpers/upload';

@Controller('requests')
export class RequestsController {
  constructor(
    private requestsService: RequestsService,
    private userAccessService: UserAccessService,
    private minioClientService: MinioClientService,
  ) {}

  @Post()
  async store(
    @Body(new JoiValidationPipe(CreateRequestPayloadSchema))
    createRequestBody: CreateRequestBody,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    await this.requestsService.store(createRequestBody, userAccess);

    return res.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }

  @Get()
  async findAll(
    @Query(new JoiValidationPipe(GetRequestsSchema))
    queryPagination: QueryPagination,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);

    const responseBody = await this.requestsService.findAll(
      queryPagination,
      userAccess,
    );

    return res.status(HttpStatus.OK).send(responseBody);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const responseBody = await this.requestsService.findById(id);

    return res.status(HttpStatus.OK).send(responseBody);
  }

  @Patch(':id/status')
  async updateStatus(
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

    await this.requestsService.updateStatus(id, changeStatusBody);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Patch(':id')
  async updateItem(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(PatchRequestItemPayloadSchema))
    updateRequestItemBody: UpdateRequestItemBody,
    @Res() res: Response,
  ): Promise<any> {
    await this.requestsService.updateItem(id, updateRequestItemBody);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ) {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    if (!userAccess.isAdmin) {
      throw new UnauthorizedException();
    }

    const filename = await this.minioClientService.upload(file);
    await this.requestsService.updateFilePath(id, filename);

    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }
}
