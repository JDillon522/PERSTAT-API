import { Test, TestingModule } from '@nestjs/testing';
import { BotUserController } from './bot-user.controller';

describe('BotUserController', () => {
  let controller: BotUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotUserController],
    }).compile();

    controller = module.get<BotUserController>(BotUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
