import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/storage/minio/minio.service';

@Injectable()
export class FilesService {
  constructor(private minioClientService: MinioClientService) {}

  async upload(file: Express.Multer.File) {
    const filename = await this.minioClientService.upload(file);
    const file_url = await this.minioClientService.download(filename);

    return {
      data: {
        filename,
        file_url,
      },
      meta: {},
    };
  }
}
