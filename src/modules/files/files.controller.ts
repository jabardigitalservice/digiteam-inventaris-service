import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../common/helpers/upload';
import { MinioClientService } from '../../storage/minio/minio.service';

@Controller('files')
export class FilesController {
  constructor(
    private service: FilesService,
    private minioClientService: MinioClientService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const responseBody = await this.service.upload(file);

    return res.status(HttpStatus.OK).send(responseBody);
  }

  @Get(':filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {
    await this.minioClientService.isExist(filename);

    const { headers, data } = await this.service.download(filename);

    res.header(headers).send(data);
  }
}
