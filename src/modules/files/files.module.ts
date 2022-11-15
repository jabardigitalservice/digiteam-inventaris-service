import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { HttpModule } from '@nestjs/axios';
import { MinioClientModule } from '../../providers/minio/minio.module';

@Module({
  imports: [MinioClientModule, HttpModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
