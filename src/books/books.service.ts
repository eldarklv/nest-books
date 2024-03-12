import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  public create(book: BookDto) {
    const newBook = this.bookModel.create(book);

    return newBook;
  }

  public findAll() {
    const allBooks = this.bookModel.find({});

    return allBooks;
  }

  public async findOne(id: string) {
    const bookById = await this.bookModel.findById(id);

    if (!bookById) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

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
