import { Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectConnection() private connection: Connection,
  ) {}

  public create(book: BookDto) {
    const newBook = new this.bookModel(book);

    return newBook.save();
  }

  public findAll() {
    const allBooks = this.bookModel.find({});

    return allBooks;
  }

  public findOne(id: string) {
    const bookById = this.bookModel.findById(id);

    return bookById;
  }

  public update(id: string, book: BookDto) {
    const updatedBook = this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
    });

    return updatedBook;
  }

  public remove(id: string) {
    const deletedBook = this.bookModel.findByIdAndDelete(id);

    return deletedBook;
  }
}
