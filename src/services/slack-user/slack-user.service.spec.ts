import { Test, TestingModule } from '@nestjs/testing';
import { SlackUserService } from './slack-user.service';

describe('SlackUserService', () => {
  let service: SlackUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackUserService],
    }).compile();

    service = module.get<SlackUserService>(SlackUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
