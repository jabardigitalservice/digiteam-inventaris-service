import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async isExist(fileName: string) {
    try {
      await this.client.statObject(this.bucketName, fileName);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async download(fileName: string) {
    try {
      const url = await this.client.presignedGetObject(
        this.bucketName,
        fileName,
      );

      return url;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
