import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { ValidateObjectIdPipe } from '../pipes/objectId.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  create(@Body() book: BookDto) {
    return this.booksService.create(book);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    // throw new BadRequestException();
    return this.booksService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id', ValidateObjectIdPipe) id: string, @Body() book: BookDto) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.booksService.remove(id);
  }
}
