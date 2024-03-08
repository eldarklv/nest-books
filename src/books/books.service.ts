import { Injectable } from '@nestjs/common';
import { Book } from './dto/book.dto';

@Injectable()
export class BooksService {
  private booksDataBase: Book[] = [];

  public create(book: Book) {
    this.booksDataBase.push(book);

    return this.booksDataBase.filter((item) => item.id === book.id);
  }

  public findAll() {
    return this.booksDataBase;
  }

  public findOne(id: number) {
    return this.booksDataBase.filter((item) => item.id === id);
  }

  public update(id: number, book: Book) {
    this.booksDataBase = this.booksDataBase.map((item) => {
      if (item.id === id) {
        return book;
      }
      return item;
    });
    return this.booksDataBase.filter((item) => item.id === id);
  }

  public remove(id: number) {
    const index = this.booksDataBase.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.booksDataBase.splice(index, 1);
      return true;
    }
    return false;
  }
}
