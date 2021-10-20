import { Controller, Get } from '@nestjs/common';
import { SlackService } from 'src/services/slack/slack.service';

@Controller('bot-user')
export class BotUserController {

    constructor(
        private slackService: SlackService
    ) {}

    @Get()
    public async getUsers(): Promise<any> {

        return await this.slackService.getBotUsers();
    }
}
