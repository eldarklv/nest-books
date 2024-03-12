import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksService } from './books.service';
import { AppModule } from '../app.module';
import { JwtService } from '@nestjs/jwt';
import { BookDto } from './dto/book.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  create: jest.fn(),
};

describe('books e2e tests', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let booksService: BooksService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService;

  const bookDto: BookDto = {
    title: 'Master and Margarita',
    description: 'Story about love',
    authors: 'Bulgakov',
    favorite: true,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    booksService = moduleRef.get<BooksService>(BooksService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST create book', async () => {
    const access_token = jwtService.sign({ id: '1' });

    await request(app.getHttpServer())
      .post('/books')
      .send(bookDto)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201)
      .then((response) => {
        expect(response.body.title).toBe(bookDto.title);
        expect(response.body.description).toBe(bookDto.description);
        expect(response.body.authors).toBe(bookDto.authors);
        expect(response.body.favorite).toBe(bookDto.favorite);
      });
  });

  it('GET all books', async () => {
    const access_token = jwtService.sign({ id: '1' });

    // создать книгу, чтобы было что получить в get all books
    await request(app.getHttpServer())
      .post('/books')
      .send(bookDto)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201);

    await request(app.getHttpServer())
      .get('/books')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        expect(response.body[0].authors).toBeDefined();
        expect(response.body[0].favorite).toBeDefined();
      });
  });

  it('GET book by id', async () => {
    const access_token = jwtService.sign({ id: '1' });

    let bookId = '';
    await request(app.getHttpServer())
      .get('/books')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .then((response) => {
        bookId = response.body[0]._id;
      });

    await request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.title).toBeDefined();
        expect(response.body.description).toBeDefined();
        expect(response.body.authors).toBeDefined();
        expect(response.body.favorite).toBeDefined();
      });
  });

  it('POST update book', async () => {
    const access_token = jwtService.sign({ id: '1' });

    const updateBook: BookDto = {
      title: 'update',
      description: 'update',
      authors: 'update',
      favorite: false,
    };

    // создать книгу, чтобы было что редактировать
    let bookId = '';
    await request(app.getHttpServer())
      .post('/books')
      .send(bookDto)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201)
      .then((response) => {
        bookId = response.body._id;
      });

    await request(app.getHttpServer())
      .post(`/books/${bookId}`)
      .send(updateBook)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201)
      .then((response) => {
        expect(response.body.title).toBe(updateBook.title);
        expect(response.body.description).toBe(updateBook.description);
        expect(response.body.authors).toBe(updateBook.authors);
        expect(response.body.favorite).toBe(updateBook.favorite);
      });
  });

  it('DELETE book', async () => {
    const access_token = jwtService.sign({ id: '1' });

    let bookId = '';
    await request(app.getHttpServer())
      .post('/books')
      .send(bookDto)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(201)
      .then((response) => {
        bookId = response.body._id;
      });

    await request(app.getHttpServer())
      .delete(`/books/${bookId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('Book not found');
      }); // книга не найдена
  });
});
