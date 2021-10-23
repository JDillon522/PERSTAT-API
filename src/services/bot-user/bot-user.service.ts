import { Injectable } from '@nestjs/common';
import { BotUserInfoDto } from 'src/models/user';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BotUserService {

    constructor(
        private db: DatabaseService
    ) {}

    public async getBotUsersInfo(): Promise<BotUserInfoDto[]> {
        const res = await this.db.client.query('SELECT * FROM public."BOT_USER_INFO";');
        return res.rows;
    }

    public async addSlackUserToDb(slackId: string): Promise<BotUserInfoDto> {
        try {
            const res = await this.db.client.query('INSERT INTO public."BOT_USER_INFO"(slack_id) VALUES($1) RETURNING *', [slackId]);
            return res.rows[0] as BotUserInfoDto;
        } catch (err) {
            return err;
        }
    }

}
