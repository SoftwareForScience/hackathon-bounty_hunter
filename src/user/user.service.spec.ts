import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let moduleref: TestingModule;
  let userService: UserService;
  const mockRepository = {
    findOne: ({ where: { username } }) => {
      let mockUser = new User();
      switch (username) {
        case 'admin':
          mockUser.id = 1;
          mockUser.username = 'admin';
          mockUser.password = 'admin';
          break;

        default:
          mockUser = undefined;
          break;
      }

      return mockUser;
    },
  };

  beforeAll(async () => {
    moduleref = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    userService = moduleref.get<UserService>(UserService);
  });

  afterAll(async () => {
    await moduleref.close();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an User object for a known user', async () => {
      // Act
      const actual = await userService.findOne('admin');

      // Assert
      expect(actual).toBeInstanceOf(User);
    });

    it('should return undefined for an unknown user', async () => {
      // Act
      const actual = await userService.findOne('unknown');

      // Assert
      expect(actual).toBeUndefined();
    });
  });
});
