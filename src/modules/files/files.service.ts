import {
  Injectable,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { MinioClientService } from '../../providers/storage/minio/minio.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { allowExtension } from '../../common/helpers/upload';
import path from 'path';
import lang from '../../common/lang/config';

@Injectable()
export class FilesService {
  constructor(
    private minioClientService: MinioClientService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async upload(file: Express.Multer.File) {
    this.validateUpload(file);

    const filename = await this.minioClientService.upload(file);
    const file_url = `${this.configService.get('app.url')}/files/${filename}`;

    return {
      data: {
        filename,
        file_url,
      },
      meta: {},
    };
  }

  async download(fileName: string) {
    await this.minioClientService.isExist(fileName);
    const fileUrl = await this.minioClientService.download(fileName);

    const file = await lastValueFrom(
      this.httpService.get(fileUrl, { responseType: 'arraybuffer' }),
    );

    const headers = file.headers;
    const data = file.data;

    return {
      headers,
      data,
    };
  }

  validateUpload(file: Express.Multer.File) {
    const regex = new RegExp(allowExtension);
    const extname = regex.test(path.extname(file.originalname).toLowerCase());

    const limitSize = this.configService.get('file.limitSize');

    const allowFileSize = limitSize * 1024 * 1024;

    const customMessage: Record<string, any> = {};
    customMessage.fieldname = file.fieldname;

    if (!extname) {
      customMessage.values = allowExtension.split('|').join(', ');

      throw new UnsupportedMediaTypeException(
        lang.__('validation.file.mimetypes', customMessage),
      );
    }

    if (file.size >= allowFileSize) {
      customMessage.max = limitSize;

      throw new PayloadTooLargeException(
        lang.__('validation.file.size', customMessage),
      );
    }
  }
}
