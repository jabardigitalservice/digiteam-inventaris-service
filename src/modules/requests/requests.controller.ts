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
  FindAllPayloadSchema,
  CreatePayloadSchema,
  UpdateStatusPayloadSchema,
  UpdateItemPayloadSchema,
  UpdateNotesPayloadSchema,
} from './requests.rules';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from '../../common/interfaces/keycloak-user.interface';
import { UserAccessService } from './../../common/providers/user-access.service';
import {
  UpdateStatus,
  Create,
  UpdateItem,
  UpdateNotes,
  FindAll,
} from './requests.interface';
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
    @Body(new JoiValidationPipe(CreatePayloadSchema))
    create: Create,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    this.requestsService.store(create, userAccess);

    return res.status(HttpStatus.CREATED).send({
      message: 'CREATED',
    });
  }

  @Get()
  async findAll(
    @Query(new JoiValidationPipe(FindAllPayloadSchema))
    queryParams: FindAll,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);

    const responseBody = await this.requestsService.findAll(
      queryParams,
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
    @Body(new JoiValidationPipe(UpdateStatusPayloadSchema))
    updateStatus: UpdateStatus,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    if (!userAccess.isAdmin) {
      throw new UnauthorizedException();
    }

    this.requestsService.updateStatus(id, updateStatus);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Patch(':id/notes')
  async updateNotes(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateNotesPayloadSchema))
    updateNotes: UpdateNotes,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    if (!userAccess.isAdmin) {
      throw new UnauthorizedException();
    }

    this.requestsService.updateNotes(id, updateNotes);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Patch(':id')
  async updateItem(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateItemPayloadSchema))
    updateItem: UpdateItem,
    @Res() res: Response,
  ): Promise<any> {
    this.requestsService.updateItem(id, updateItem);

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
    this.requestsService.updateFilePath(id, filename);

    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }
}
