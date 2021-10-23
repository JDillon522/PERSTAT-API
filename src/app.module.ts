import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotUserController } from './controllers/bot-user/bot-user.controller';
import { SlackService } from './services/slack/slack.service';
import { DatabaseService } from './services/database/database.service';
import { SlackUserService } from './services/slack-user/slack-user.service';
import { BotUserService } from './services/bot-user/bot-user.service';
import { TeamService } from './services/team/team.service';
import { TeamController } from './controllers/team/team.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [
    BotUserController,
    TeamController
  ],
  providers: [
    SlackService,
    DatabaseService,
    SlackUserService,
    BotUserService,
    TeamService
  ],
})
export class AppModule {}
