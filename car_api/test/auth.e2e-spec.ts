import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // starter(app);
    await app.init();
  });

  afterEach(()=>{ 
     // clear database every time when we run test
  }); 

  it('handles a signup request', () => {
    const email = "test@wespa.com";
    return request(app.getHttpServer())
    .post('/auth/signup')
    .send({
        email: email,
        password: "asdfsdf"
    })
    .expect(201)
    .then(async (res)=>{
        const {id, email} = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
        // await request(app.getHttpServer())
        // .delete(`/auth/${id}`);
    });
  });
});
