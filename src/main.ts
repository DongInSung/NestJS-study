import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // npm i class-validator
  // npm i class-transformer
  app.useGlobalPipes(new ValidationPipe({
    // WhiteList에 없는 속성 제거
    whitelist: true,
    // WhiteList에 없는 속성에 대해 예외처리
    forbidNonWhitelisted: true,
    // With the auto-transformation option enabled, the ValidationPipe will also perform conversion of primitive types.
    transform: true
  }))
  //app.use(cookieParser());
  await app.listen(3200);
}
bootstrap();
