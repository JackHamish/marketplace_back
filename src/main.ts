import { NestFactory } from "@nestjs/core";
import { AppModule } from "./application/app.module";
import { ValidationPipe } from "@nestjs/common";
import { json as expressJson, urlencoded as expressUrlEncoded } from "express";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./configs/firebase/firebase.config";

initializeApp(firebaseConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.APP_PORT || 3001;

  app.enableCors();

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(expressJson({ limit: "50mb" }));
  app.use(expressUrlEncoded({ limit: "50mb", extended: true }));

  console.log(port);

  await app.listen(port);
}
bootstrap();
