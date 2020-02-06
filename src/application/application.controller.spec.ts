import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationConfiguration } from '../authentication/authentication.configuration';
import { AuthenticationModule } from '../authentication/authentication.module';
import database, { TypeOrmConfigService } from '../config/database.config';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

describe('ApplicationController', () => {
  let moduleRef: TestingModule;
  let applicationController: ApplicationController;
  let applicationService: ApplicationService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [
        ApplicationController,
      ],
      imports: [
        AuthenticationModule,
        ConfigModule.forRoot({
          load: [
            AuthenticationConfiguration,
            database,
          ],
          isGlobal: true,
        }),
        UserModule,
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
      ],
      providers: [
        ApplicationService,
      ],
    }).compile();

    applicationService = await moduleRef.resolve(ApplicationService);
    applicationController = await moduleRef.resolve(ApplicationController);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(applicationController).toBeDefined();
    expect(applicationService).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // Act
      const res = applicationController.getHello();

      // Assert
      expect(res).toStrictEqual('Hello World!');
    });
  });

  describe('getProfile', () => {
    it('should return "Hello World!"', () => {
      // Arrange
      const mockUser = new User();
      mockUser.id = 1;

      const mockRequest = {
        user: mockUser,
      };

      // Act
      const res = applicationController.getProfile(mockRequest);

      // Assert
      expect(res).toStrictEqual<User>(mockUser);
    });
  });
});
