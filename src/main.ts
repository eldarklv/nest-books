import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExtendBody } from './interceptors/extend.body.interceptor';
import { HttpExceptionFilter } from './exceptionFilter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Выключил Interceptor, т.к. он конфликтует useGlobalInterceptors с HttpExceptionFilter
  // У них примерно одинаковая логика
  // app.useGlobalInterceptors(new ExtendBody());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
