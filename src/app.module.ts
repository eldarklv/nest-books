import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RxjsModule } from './rxjs/rxjs.module';

@Module({
  imports: [
    BooksModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    RxjsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
