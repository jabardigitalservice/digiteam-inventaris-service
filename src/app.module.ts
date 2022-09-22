import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { MysqlDatabaseModule } from './database/mysql/database.module';
import { SamplesModule } from './models/samples/samples.module';
import { HttpExceptionFilter } from './common/exceptions/http-error.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [AuthenticationModule, SamplesModule, MysqlDatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
