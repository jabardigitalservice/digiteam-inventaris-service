import { AppConfigService } from './config/app/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigService = app.get(AppConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appConfig.port);
}
bootstrap();
