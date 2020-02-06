import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let moduleRef: TestingModule;
  let authenticationService: AuthenticationService;

  const mockJwtService: Partial<JwtService> = {
    sign: jest.fn((...args) => JSON.stringify(args)),
  };
  const mockUserService: Partial<UserService> = {
    findOne: jest.fn(async (username: string) => {
      let user = new User();
      switch (username) {
        case 'admin':
          user.id = 1;
          user.username = 'admin';
          user.password = 'admin';
          break;

        default:
          user = null;
          break;
      }

      return Promise.resolve(user);
    }),
  };

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
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

    authenticationService = await moduleRef.resolve(AuthenticationService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();
  });

  describe('login', () => {
    it('should return a LoginResponseDto object', () => {
      // Arrange
      const mockUser = new User();

      // Act
      const actual = authenticationService.login(mockUser);

      // Assert
      expect(actual).not.toBeUndefined();
      expect(actual).not.toBeNull();
      expect(actual.access_token).not.toBeUndefined();
      expect(actual.access_token).not.toBeNull();
    });
  });

  describe('validateUser', () => {
    it('should return a Promise containing a User object', async () => {
      // Arrange
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.username = 'admin';
      mockUser.password = 'admin';

      // Act
      const actual = authenticationService.validateUser(mockUser.username, mockUser.password);

      // Assert
      expect(actual).toBeInstanceOf(Promise);
      expect(await actual).toStrictEqual(mockUser);
    });

    it('should return a Promise containing a null object', async () => {
      // Arrange
      const mockUser = new User();
      mockUser.id = -1;
      mockUser.username = 'unknown';
      mockUser.password = 'unknown';

      // Act
      const actual = authenticationService.validateUser(mockUser.username, mockUser.password);

      // Assert
      expect(actual).toBeInstanceOf(Promise);
      expect(await actual).toBeNull();
    });
  });
});
