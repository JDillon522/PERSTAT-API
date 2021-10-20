import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './controllers/app.controller';
import { BotUserController } from './controllers/bot-user/bot-user.controller';
import { SlackService } from './services/slack/slack.service';

@Module({
  imports: [],
  controllers: [AppController, BotUserController],
  providers: [AppService, SlackService],
})
export class AppModule {}
