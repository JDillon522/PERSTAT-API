import { AssignedTeam } from "./team";

export interface BotUserInfoDto {
    id: number;
    slack_id: string;
    perstat_required: boolean;
    included_in_report: boolean;
    team_name: string;
    role: string;
}

export interface User {
    bot_id: number;
    slack_id: string;
    name: string;
    perstat_required: boolean;
    included_in_report: boolean;
    role: string;
    team_name: string;
}
