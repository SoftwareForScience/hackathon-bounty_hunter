import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
  let moduleRef: TestingModule;
  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;

  const mockJwtService: Partial<JwtService> = {
    sign: jest.fn((...args) => JSON.stringify(args)),
  };
  const mockUserService: Partial<UserService> = {};

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [
        AuthenticationController,
      ],
      providers: [
        AuthenticationService,
        JwtService,
        UserService,
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    authenticationController = await moduleRef.resolve(AuthenticationController);
    authenticationService = await moduleRef.resolve(AuthenticationService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(authenticationController).toBeDefined();
    expect(authenticationService).toBeDefined();
  });

  describe('login', () => {
    it('should return the LoginResponseDto', () => {
      // Arrange
      const mockUser: User = {
        id: 1,
        username: 'admin',
        password: 'admin',
      };
      const mockRequest = {
        user: mockUser,
      };

      // Act
      const res = authenticationController.login(mockRequest);

      // Assert
      expect(res).not.toBeUndefined();
      expect(res).not.toBeNull();
      expect(res.access_token).not.toBeUndefined();
      expect(res.access_token).not.toBeNull();
      expect(res.access_token).not.toStrictEqual('');
    });
  });

  describe('loginGithub', () => {
    it('should return nothing', () => {
      // Act
      const res = authenticationController.loginGithub();

      // Assert
      expect(res).toBeUndefined();
    });
  });

  describe('loginGithubCallback', () => {
    it('should return a LoginResponseDto object', () => {
      // Arrange
      const mockUser: User = {
        id: 1,
        username: 'admin',
        password: 'admin',
      };
      const mockRequest = {
        user: mockUser,
      };

      // Act
      const res = authenticationController.loginGithubCallback(mockRequest);

      // Assert
      expect(res).not.toBeUndefined();
      expect(res).not.toBeNull();
      expect(res.access_token).not.toBeUndefined();
      expect(res.access_token).not.toBeNull();
      expect(res.access_token).not.toStrictEqual('');
    });
  });
});
