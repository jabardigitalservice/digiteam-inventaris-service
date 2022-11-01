import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { NewrelicInterceptor } from './common/interceptors/newrelic.interceptor';
import logger from './common/logger/winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, logger);

  const configService: ConfigService = app.get(ConfigService);
  app.enableCors();
  app.use(helmet());
  app.useGlobalInterceptors(new NewrelicInterceptor());

  await app.listen(configService.get('app.port'));
}
bootstrap();
