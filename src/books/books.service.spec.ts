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
    create: jest.fn(),
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

  it('create book', async () => {
    // Почему так мок не сработал?
    // jest.spyOn(modelBook, 'create').mockResolvedValue(mockBook);
    const bookDto: BookDto = {
      title: 'Master and Margarita',
      description: 'Story about love',
      authors: 'Bulgakov',
      favorite: true,
    };
    const createdBook = { _id: '65ef79c8e816e5bfe895a41e', ...bookDto };
    (modelBook.create as jest.Mock).mockResolvedValue(createdBook);

    const result = await bookService.create(bookDto);
    expect(result).toEqual(createdBook);
  });

  it('find book', async () => {
    jest.spyOn(modelBook, 'findById').mockResolvedValue(mockBook);

    const createdBook = await bookService.findOne(mockBook._id);

    expect(createdBook).toBeDefined();
    expect(createdBook).toEqual(mockBook);
  });

  it('find all books', async () => {
    jest.spyOn(modelBook, 'find').mockResolvedValue([mockBook, mockBook]);

    const books = await bookService.findAll();

    expect(books).toBeDefined();
    expect(books).toHaveLength(2);
    expect(books).toEqual([mockBook, mockBook]);
  });

  it('update book', async () => {
    jest.spyOn(modelBook, 'findByIdAndUpdate').mockResolvedValue(mockBook);

    const bookDto: BookDto = {
      title: 'Master and Margarita',
      description: 'Story about love',
      authors: 'Bulgakov',
      favorite: true,
    };

    const updatedBook = await bookService.update(mockBook._id, bookDto);

    expect(updatedBook).toBeDefined();
    expect(updatedBook).toEqual(mockBook);
  });

  it('delete book', async () => {
    jest.spyOn(modelBook, 'findByIdAndDelete').mockResolvedValue(mockBook);

    const deletedBook = await bookService.remove(mockBook._id);

    expect(deletedBook).toBeDefined();
    expect(deletedBook).toEqual(mockBook);
  });
});
