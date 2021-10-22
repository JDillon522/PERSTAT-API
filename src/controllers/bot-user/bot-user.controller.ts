import { Controller, Get } from '@nestjs/common';
import { BotUserService } from 'src/services/bot-user/bot-user.service';
import { SlackUserService } from 'src/services/slack-user/slack-user.service';

@Controller('bot-user')
export class BotUserController {

    constructor(
        private slack: SlackUserService,
        private botUser: BotUserService
    ) {}

    @Get()
    public async getUsers(): Promise<any> {
        const db = await this.botUser.getBotUsers();
        const slack = await this.slack.getBotUsers();

        return {
            db: db,
            slack: slack
        }
    }
}
