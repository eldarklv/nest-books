import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExtendBody } from './interceptors/extend.body.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ExtendBody());
  await app.listen(3000);
}
bootstrap();
