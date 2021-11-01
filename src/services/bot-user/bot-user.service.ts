import { Injectable } from '@nestjs/common';
import { BotUserInfoDto, User } from 'src/models/user';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BotUserService {

    constructor(
        private db: DatabaseService
    ) {}

    public async getBotUsersInfo(): Promise<BotUserInfoDto[]> {
        const res = await this.db.client.query(`
        SELECT
            public."BOT_USER_INFO".id,
            slack_id,
            perstat_required,
            included_in_report,
            team_name,
            public."TEAM_ROLE".role
        FROM public."BOT_USER_INFO"
        LEFT JOIN public."TEAM"
            on public."BOT_USER_INFO".assigned_team = public."TEAM".id
        LEFT JOIN public."TEAM_ROLE"
            on public."BOT_USER_INFO".team_role = public."TEAM_ROLE".id;
        `);
        return res.rows;
    }

    public async addSlackUserToDb(slackId: string): Promise<BotUserInfoDto> {
        try {
            const res = await this.db.client.query('INSERT INTO public."BOT_USER_INFO"(slack_id) VALUES($1) RETURNING *', [slackId]);
            return res.rows[0] as BotUserInfoDto;
        } catch (error) {
            return error;
        }
    }

    public async updateDbUser(user: User): Promise<BotUserInfoDto> {
        try {
            const res = await this.db.client.query(
                `UPDATE public."BOT_USER_INFO"
                    SET perstat_required=$1, included_in_report=$2, assigned_team=$3, team_role=$4
                WHERE id=$5
                RETURNING *`,
                [user.perstat_required, user.included_in_report, user.team_name, user.role, user.bot_id]
            );
            return res.rows[0] as BotUserInfoDto;
        } catch (error) {
            return error;
        }
    }

}
