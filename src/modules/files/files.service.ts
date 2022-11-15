import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { MinioClientService } from '../../providers/minio/minio.service';

@Injectable()
export class FilesService {
  constructor(
    private minioClientService: MinioClientService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async upload(file: Express.Multer.File) {
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
}
