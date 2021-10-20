import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class SlackService {

    constructor(
        private db: DatabaseService
    ) { }


    public async getBotUsers() {
        const res = await this.db.client.query('SELECT * FROM public."BOT_USER_INFO";');

        return res.rows;
    }
}
