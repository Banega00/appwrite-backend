import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as cookieParser from 'cookie-parser';
import { ClsService } from 'nestjs-cls';
import { ContextService } from '../src/shared/context/context.service';
import { GlobalExceptionFilter } from '../src/shared/exceptions/global-exception.filter';
import { RequestLoggingInterceptor } from '../src/shared/interceptors/request-logging.interceptor';
import { CustomLoggingService } from '../src/shared/logger/logger.service';
import { ConfigService } from '../src/shared/config/config.service';
jest.useFakeTimers({ legacyFakeTimers: true });
jest.setTimeout(20000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let auth_cookie = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
      origin: '*',
    });

    const logger = await app.resolve<CustomLoggingService>(CustomLoggingService);
    const contextService = await app.resolve<ContextService>(ContextService);
    const clsService = await app.resolve<ClsService>(ClsService);
    const configService = await app.resolve<ConfigService>(ConfigService);
    app.useGlobalInterceptors(new RequestLoggingInterceptor(logger, clsService));
    app.useGlobalFilters(new GlobalExceptionFilter(logger, contextService, configService));

    await app.init();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
      origin: '*',
    });

    const logger = await app.resolve<CustomLoggingService>(CustomLoggingService);
    const contextService = await app.resolve<ContextService>(ContextService);
    const clsService = await app.resolve<ClsService>(ClsService);
    const configService = await app.resolve<ConfigService>(ConfigService);
    app.useGlobalInterceptors(new RequestLoggingInterceptor(logger, clsService));
    app.useGlobalFilters(new GlobalExceptionFilter(logger, contextService, configService));

    await app.init();
  });

  it('Health check: GET /health', () => {
    return request(app.getHttpServer()).get('/health').expect(200);
  });

  it('Login: POST /login', async () => {
    const response = await request(app.getHttpServer()).post('/login').expect(201);

    const cookie = (response.headers['set-cookie'] as any).find((cookie) => cookie.includes('auth_token'));
    auth_cookie = cookie;
    expect((response.headers['set-cookie'] as any).some((cookie) => cookie.includes('auth_token'))).toBe(true);
  });

  it('Register: POST /register - without cookie - should get 401', async () => {
    const response = await request(app.getHttpServer()).post('/register').expect(401);
  });

  it('Register: POST /register - with cookie - should get 201', async () => {
    if (!auth_cookie) {
      const response = await request(app.getHttpServer()).post('/login').expect(201);
      const cookie = (response.headers['set-cookie'] as any).find((cookie) => cookie.includes('auth_token'));
      auth_cookie = cookie;
    }

    const randomNumber = Math.floor(Math.random() * 1000000);
    const email = `john.doe${randomNumber}@gmail.com`;
    const response = await request(app.getHttpServer())
      .post('/register')
      .set('Cookie', auth_cookie)
      .send({ email, name: 'John', password: 'password' })
      .expect(201);
  });

  it('Register: POST /register - invalid email - should return 400', async () => {
    if (!auth_cookie) {
      const response = await request(app.getHttpServer()).post('/login').expect(201);
      const cookie = (response.headers['set-cookie'] as any).find((cookie) => cookie.includes('auth_token'));
      auth_cookie = cookie;
    }

    const randomNumber = Math.floor(Math.random() * 1000000);
    const email = `john.doe${randomNumber}@`;
    const response = await request(app.getHttpServer())
      .post('/register')
      .set('Cookie', auth_cookie)
      .send({ email, name: 'John', password: 'password' })
      .expect(400);
  });

  it('Get user data: GET /user - without cookie - should return 401', async () => {
    if (!auth_cookie) {
      const response = await request(app.getHttpServer()).post('/login').expect(201);
      const cookie = (response.headers['set-cookie'] as any).find((cookie) => cookie.includes('auth_token'));
      auth_cookie = cookie;
    }
    const response = await request(app.getHttpServer()).get('/user').expect(401);
  });

  it('Get user data: GET /user - with cookie - should return 201', async () => {
    if (!auth_cookie) {
      const response = await request(app.getHttpServer()).post('/login').expect(201);
      const cookie = (response.headers['set-cookie'] as any).find((cookie) => cookie.includes('auth_token'));
      auth_cookie = cookie;
    }

    const randomNumber = Math.floor(Math.random() * 1000000);
    const email = `john.doe${randomNumber}@gmail.com`;
    const registerResponse = await request(app.getHttpServer())
      .post('/register')
      .set('Cookie', auth_cookie)
      .send({ email, name: 'John', password: 'password' })
      .expect(201);

    const response = await request(app.getHttpServer()).get('/user').set('Cookie', auth_cookie).expect(200);
    expect(response.body.email).toBe(email);
    expect(response.body.name).toBe('John');
  });

  it('Create reservation: POST /reservation - without cookie - should return 401', async () => {
    const response = await request(app.getHttpServer()).post('/reservation').expect(401);
  });

  it('Create reservation: POST /reservation - with cookie - invalid data - should return 400', async () => {
    const reservationData = {
      time: 'gsagaga',
      date: 'gasgasgas',
      numberOfGuests: 2,
    };
    const response = await request(app.getHttpServer()).post('/reservation').set('Cookie', auth_cookie).expect(400);
  });

  it('Create reservation: POST /reservation - with cookie - date in past - should return 400', async () => {
    const reservationData = {
      time: '12:00',
      date: '2023-12-12',
      numberOfGuests: 2,
    };
    const response = await request(app.getHttpServer()).post('/reservation').set('Cookie', auth_cookie).expect(400);
  });

  it('Create reservation: POST /reservation - with cookie - should return 201', async () => {
    const reservationData = {
      time: '12:00',
      date: '2024-12-12',
      numberOfGuests: 2,
    };
    const response = await request(app.getHttpServer()).post('/reservation').set('Cookie', auth_cookie).expect(201).send(reservationData);
  });

  it('Get users reservations: GET /reservations - without cookie - should return 401', async () => {
    const response = await request(app.getHttpServer()).get('/reservations').expect(401);
  });

  it('Get users reservations: GET /reservations - with cookie - should return 200', async () => {
    const response = await request(app.getHttpServer()).get('/reservations').set('Cookie', auth_cookie).expect(200);
  });
});
