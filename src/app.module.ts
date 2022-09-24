import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { RequestsModule } from './models/requests/requests.module';
import { UsersModule } from './models/users/users.module';
import { HttpExceptionFilter } from './common/exceptions/http-error.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    AuthenticationModule,
    RequestsModule,
    UsersModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
