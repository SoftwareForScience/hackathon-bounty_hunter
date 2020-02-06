import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ApplicationModule } from '../src/application/application.module';

describe('ApplicationController (e2e)', () => {
  let moduleRef: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ApplicationModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/profile', () => {
    let agent: request.SuperTest<request.Test>;
    let token: string;

    beforeAll(async () => {
      agent = request.agent(app.getHttpServer());

      const res = await agent
        .post('/auth/login')
        .send({
          username: 'admin',
          password: 'admin',
        })
        .expect(200);

      // eslint-disable-next-line jest/no-standalone-expect
      expect(res.body).toHaveProperty('access_token');
      token = res.body.access_token;
    });

    describe('GET', () => {
      it('should return the profile of the logged in user', async () => {
        // Act
        const res = await agent
          .get('/profile')
          .set('Authorization', `Bearer ${token}`)
          .expect(200);

        // Assert
        expect(res.body).toStrictEqual({
          userId: 1,
          username: 'admin',
        });
      });
    });
  });
});
