import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BotUserService {

    constructor(
        private db: DatabaseService
    ) {}

    public async getBotUsers(): Promise<any> {
        const res = await this.db.client.query('SELECT * FROM public."BOT_USER_INFO";');
        return res.rows;
    }
}
