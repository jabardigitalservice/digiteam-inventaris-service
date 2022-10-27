import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { AppConfigModule } from '../../config/app/config.module';
import { MinioClientService } from './minio.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          endPoint: configService.get('minio.endPoint'),
          port: configService.get('minio.port'),
          useSSL: configService.get('minio.useSSL'),
          accessKey: configService.get('minio.accessKey'),
          secretKey: configService.get('minio.secretKey'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
