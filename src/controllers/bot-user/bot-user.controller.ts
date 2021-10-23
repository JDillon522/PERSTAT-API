import { Controller, Get } from '@nestjs/common';
import { BotUserInfoDto, User } from 'src/models/user';
import { BotUserService } from 'src/services/bot-user/bot-user.service';
import { SlackUserService } from 'src/services/slack-user/slack-user.service';
import { Member } from '@slack/web-api/dist/response/UsersListResponse';
import { sortBy } from 'lodash';

@Controller('bot-user')
export class BotUserController {

    constructor(
        private slack: SlackUserService,
        private botUser: BotUserService
    ) {}

    @Get()
    public async getUsers(): Promise<any> {
        const botUsers = await this.botUser.getBotUsersInfo();
        const slackUsers = await this.slack.getSlackUsers();

        return this.normalizeSlackAndBotUsers(botUsers, slackUsers);
    }

    private async normalizeSlackAndBotUsers(bot: BotUserInfoDto[], slack: Member[]): Promise<User[]> {
        const users: User[] = [];

        for await (const user of slack) {
            // if slack user is in db, tack db data onto slack user object
            let dbUser = bot.find(dbUser => dbUser.slack_id === user.id);
            if (!dbUser) {
                // if not in the db add it and then add it to the slack user
                dbUser = await this.botUser.addSlackUserToDb(user.id);
            }

            users.push({
                bot_id: dbUser.id,
                slack_id: user.id,
                name: user.real_name,
                perstat_required: dbUser.perstat_required,
                included_in_report: dbUser.included_in_report
            });
        }

        return sortBy(users, ['name']);
    }
}
