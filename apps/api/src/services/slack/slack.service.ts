import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App } from '@slack/bolt';

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
    ) {
        this.connectToSlack();
    }

    private async connectToSlack(): Promise<void> {
        await this.app.start(this.config.get<number>('SLACK_SOCKET_PORT'));
    }
}
