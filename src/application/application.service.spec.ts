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

  describe('getTitle', () => {
    it('should return "Bounty Hunter"', () => {
      // Act
      const res = applicationService.getTitle();

      // Assert
      expect(res).toStrictEqual('Bounty Hunter');
    });
  });

  describe('getVersion', () => {
    it('should return a version matching the Semantic Versioning scheme', () => {
      // Act
      const res = applicationService.getVersion();

      // Assert
      expect(res).toMatch('\\d+\\.\\d+\\.\\d');
    });
  });
});
