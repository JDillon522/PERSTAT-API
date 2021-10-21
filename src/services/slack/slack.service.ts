import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App } from '@slack/bolt';
import { DatabaseService } from '../database/database.service';
import { Member } from '@slack/web-api/dist/response/UsersListResponse';


@Injectable()
export class SlackService {
    public app = new App({
        token: this.config.get<string>('SLACK_BOT_TOKEN'),
        signingSecret: this.config.get<string>('SLACK_SIGNING_SECRET'),
        socketMode: true,
        appToken: this.config.get<string>('SLACK_PERSTAT_BOT_SOCKET_TOKEN')
    });


    constructor(
        private config: ConfigService,
        private db: DatabaseService
    ) {
        this.connectToSlack();
    }

    private async connectToSlack() {
        await this.app.start(this.config.get<number>('SLACK_SOCKET_PORT'));
    }

    public async getBotUsers() {
        // const res = await this.db.client.query('SELECT * FROM public."BOT_USER_INFO";');

        const usersList = await this.app.client.users.list();
        let users: Member[] = usersList.members?.filter(user => !user.is_bot && !user.deleted && user.name != 'slackbot') || [];

        // During local development if we only want to ping a single user
        if (process.env.SEND_ONLY_TO_USER) {
            users = users.filter(user => user.id === process.env.SEND_ONLY_TO_USER);
        }
        return users;
    }
}
