import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { starter } from '../src/starter';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    starter(app);
    await app.init();
  });

  it('handles a signup request', () => {
    const email = "test@test.com";
    return request(app.getHttpServer())
    .post('/auth/signup')
    .send({
        email: email,
        password: "asdfsdf"
    })
    .expect(201)
    .then((res)=>{
        const {id, email} = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
    });
  });
});
