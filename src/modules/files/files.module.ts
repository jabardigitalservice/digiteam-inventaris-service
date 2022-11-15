import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MinioClientModule } from '../../providers/storage/minio/minio.module';
import { FilesService } from './files.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MinioClientModule, HttpModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
