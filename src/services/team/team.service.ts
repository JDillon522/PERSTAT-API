import { Injectable } from '@nestjs/common';
import { Role, TeamDto, TeamRoleDto } from 'src/models/team';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TeamService {

    constructor(
        private db: DatabaseService
    ) { }

    public async getTeams(): Promise<TeamDto[]> {
        const res = await this.db.client.query('SELECT * FROM public."TEAM"');

        return res.rows;
    }

    public async createTeam(name: string): Promise<TeamDto> {
        const res = await this.db.client.query('INSERT into public."TEAM"(team_name) VALUES($1) RETURNING *', [name]);

        return res.rows[0];
    }

    public async getTeamRoles(): Promise<TeamRoleDto[]> {
        const res = await this.db.client.query('SELECT * FROM public."TEAM_ROLE"');

        return res.rows;
    }

    public async createTeamRole(name: Role): Promise<TeamRoleDto> {
        const res = await this.db.client.query('INSERT into public."TEAM_ROLE"(role) VALUES($1) RETURNING *', [name]);

        return res.rows[0];
    }
}
