import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MinioClientModule } from './../../storage/minio/minio.module';
import { FilesService } from './files.service';

@Module({
  imports: [MinioClientModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
