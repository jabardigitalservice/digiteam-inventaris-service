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

@Controller('files')
export class FilesController {
  constructor(private service: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const responseBody = await this.service.upload(file);

    return res.status(HttpStatus.OK).send(responseBody);
  }

  @Get(':filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {
    const { headers, data } = await this.service.download(filename);

    res.header(headers).send(data);
  }
}
