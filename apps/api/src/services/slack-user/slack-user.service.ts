import { Injectable } from '@nestjs/common';
import { SlackService } from '../slack/slack.service';
import { Member } from '@slack/web-api/dist/response/UsersListResponse';

@Injectable()
export class SlackUserService {

    constructor(
        private slackService: SlackService
    ) { }

    public async getSlackUsers(): Promise<Member[]> {
        const usersList = await this.slackService.app.client.users.list();
        let users: Member[] = usersList.members?.filter(user => !user.is_bot && !user.deleted && user.name !== 'slackbot') || [];

        // During local development if we only want to ping a single user
        if (process.env.SEND_ONLY_TO_USER) {
            users = users.filter(user => user.id === process.env.SEND_ONLY_TO_USER);
        }
        return users;
    }
}
