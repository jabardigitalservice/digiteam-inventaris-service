import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'nestjs-minio-client';
import { createFileObject } from './../../common/helpers/upload';

@Injectable()
export class MinioClientService {
  constructor(
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
  ) {}

  private bucketName = this.configService.get('minio.bucketName');

  private get client() {
    return this.minioService.client;
  }

  async upload(file: Express.Multer.File) {
    try {
      const { fileName, fileBuffer, metaData } = createFileObject(file);
      await this.client.putObject(
        this.bucketName,
        fileName,
        fileBuffer,
        metaData,
      );

      return fileName;
    } catch {
      throw new BadRequestException();
    }
  }
}
