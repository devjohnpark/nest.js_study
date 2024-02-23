import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Root Module
  await app.listen(3000);
}
bootstrap(); // nest.js execution (bootstrap: 사물의 초기 단계에서 단순 요소로부터 복잡한 체계를 구축하는 과정이란 뜻)
