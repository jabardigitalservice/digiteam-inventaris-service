import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MysqlConfigModule } from '../../config/database/mysql/config.module';
import { MysqlConfigService } from '../../config/database/mysql/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, MysqlConfigModule],
      useExisting: MysqlConfigService,
    }),
  ],
})
export class MysqlDatabaseModule {}
