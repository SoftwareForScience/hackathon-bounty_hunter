import { ExecutionContext, INestApplication } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ApplicationModule } from '../src/application/application.module';
import { GithubAuthGuard } from '../src/authentication/guard/githubAuth.guard';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;

  const mockGithubAuthGuard: Partial<IAuthGuard> = {
    canActivate: jest.fn((context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      request.user = {
        id: 12345,
        username: 'john_doe',
      };

      return true;
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ApplicationModule,
      ],
    })
      .overrideGuard(GithubAuthGuard)
      .useValue(mockGithubAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/login', () => {
    describe('GET', () => {
      it('should not support GET requests', async () => {
        await request(app.getHttpServer())
          .get('/auth/login')
          .expect(404);
      });
    });

    describe('POST', () => {
      it('should return status 200 for valid credentials', async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            username: 'admin',
            password: 'admin',
          })
          .expect(200);
      });

      it('should return status 401 for invalid credentials', async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            username: 'unknown',
            password: 'unknown',
          })
          .expect(401);
      });

      it('should return status 401 for missing credentials', async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .expect(401);
      });
    });
  });

  describe('/auth/github(/callback)', () => {
    describe('GET', () => {
      it('should return a token', async () => {
        // Act
        const res = await request(app.getHttpServer())
          .get('/auth/github/callback')
          .expect(200);

        // Assert
        expect(res.body).toHaveProperty('access_token');
      });
    });
  });
});
