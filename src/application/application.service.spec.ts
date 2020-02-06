import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';

describe('ApplicationService', () => {
  let moduleRef: TestingModule;
  let applicationService: ApplicationService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        ApplicationService,
      ],
    }).compile();

    applicationService = await moduleRef.resolve(ApplicationService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(applicationService).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // Act
      const res = applicationService.getHello();

      // Assert
      expect(res).toStrictEqual('Hello World!');
    });
  });
});
