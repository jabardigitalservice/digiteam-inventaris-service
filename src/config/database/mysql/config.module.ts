import { Global, Module } from '@nestjs/common';
import { MysqlConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../../app/config.module';
import { AppConfigService } from '../../app/config.service';

@Global()
@Module({
  imports: [ConfigModule, AppConfigModule],
  providers: [AppConfigService, MysqlConfigService],
  exports: [AppConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
