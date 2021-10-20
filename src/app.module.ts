import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotUserController } from './controllers/bot-user/bot-user.controller';
import { SlackService } from './services/slack/slack.service';
import { DatabaseService } from './services/database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [
    BotUserController
  ],
  providers: [
    SlackService,
    DatabaseService
  ],
})
export class AppModule {}
