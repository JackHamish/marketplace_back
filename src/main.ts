import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { ValidationPipe } from '@nestjs/common';
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(expressJson({ limit: '50mb' }));
  app.use(expressUrlEncoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
