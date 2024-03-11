import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { BookDto } from './dto/book.dto';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let bookService: BooksService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let modelBook: Model<Book>;

  const mockModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
  };

  const mockBook = {
    _id: '65ef79c8e816e5bfe895a41e',
    title: 'Master and Margarita',
    description: 'Story about love',
    authors: 'Bulgakov',
    favorite: true,
    __v: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    modelBook = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  it('find book', async () => {
    jest.spyOn(modelBook, 'findById').mockResolvedValue(mockBook);

    const createdBook = await bookService.findOne(mockBook._id);

    expect(createdBook).toBeDefined();
    expect(createdBook).toEqual(mockBook);
  });
});
