import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { ValidateObjectIdPipe } from 'src/pipes/objectId.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() book: BookDto) {
    return this.booksService.create(book);
  }

  @Get()
  findAll() {
    // throw new BadRequestException();
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @Post(':id')
  update(@Param('id', ValidateObjectIdPipe) id: string, @Body() book: BookDto) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.booksService.remove(id);
  }
}
