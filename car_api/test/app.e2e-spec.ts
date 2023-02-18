import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { starter } from '../src/starter';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    app = moduleFixture.createNestApplication(); // add this cookie session and so on and this shoudl work fine 
    // starter(app); // run what we have in main.ts app.use and so on
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
