import { Injectable } from '@nestjs/common';
import { Book } from './dto/book.dto';

@Injectable()
export class BooksService {
  private booksDataBase: Book[] = [];

  public create(book: Book) {
    return 'This action adds a new book';
  }

  public findAll() {
    return `This action returns all books`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  public update(id: number, book: Book) {
    return `This action updates a #${id} book`;
  }

  public remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
