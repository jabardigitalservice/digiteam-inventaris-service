import { Global, Module } from '@nestjs/common';
import { KeycloakConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../../app/config.module';
import { AppConfigService } from '../../app/config.service';

@Global()
@Module({
  imports: [ConfigModule, AppConfigModule],
  providers: [AppConfigService, KeycloakConfigService],
  exports: [AppConfigService, KeycloakConfigService],
})
export class KeycloakConfigModule {}
