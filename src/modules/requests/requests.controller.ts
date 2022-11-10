import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  Query,
  Patch,
  Put,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestsService } from './requests.service';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import {
  FindAllPayloadSchema,
  CreatePayloadSchema,
  UpdateStatusPayloadSchema,
  UpdateItemPayloadSchema,
  UpdateNotesPayloadSchema,
  UpdatePickupPayloadSchema,
  UpdateFilenamePayloadSchema,
  UpdatePayloadSchema,
} from './requests.rules';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { AuthUser } from '../../common/interfaces/keycloak-user.interface';
import { UserAccessService } from './../../common/providers/user-access.service';
import { Update, Create, FindAll } from './requests.interface';

@Controller('requests')
export class RequestsController {
  constructor(
    private requestsService: RequestsService,
    private userAccessService: UserAccessService,
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdatePayloadSchema))
    update: Update,
    @Res() res: Response,
  ) {
    this.requestsService.update(id, update);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateStatusPayloadSchema))
    updateStatus: Update,
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
    updateNotes: Update,
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
    updateItem: Update,
    @Res() res: Response,
  ): Promise<any> {
    this.requestsService.updateItem(id, updateItem);

    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Patch(':id/filename')
  async updateFilename(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateFilenamePayloadSchema))
    updateFilename: Update,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ) {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    if (!userAccess.isAdmin) {
      throw new UnauthorizedException();
    }

    this.requestsService.updateFilename(id, updateFilename);

    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Patch(':id/received')
  async updateReceived(
    @Param('id') id: string,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    if (!userAccess.isAdmin) {
      throw new UnauthorizedException();
    }

    this.requestsService.updateReceived(id);
    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }

  @Patch(':id/pickup')
  async updatePickup(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdatePickupPayloadSchema))
    updatePickup: Update,
    @AuthenticatedUser() authUser: AuthUser,
    @Res() res: Response,
  ): Promise<any> {
    const userAccess = this.userAccessService.getUserAccess(authUser);
    if (!userAccess.isAdmin) {
      throw new UnauthorizedException();
    }

    this.requestsService.updatePickup(id, updatePickup);

    return res.status(HttpStatus.OK).send({
      message: 'UPDATED',
    });
  }
}
