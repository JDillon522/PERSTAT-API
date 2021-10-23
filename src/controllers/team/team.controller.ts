import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from 'src/models/team';
import { TeamService } from 'src/services/team/team.service';

@Controller('api/team')
export class TeamController {

    constructor(
        private teamService: TeamService
    ) { }

    @Get()
    public async getTeams() {
        const teams = await this.teamService.getTeams();
        return teams;
    }

    @Post()
    public async createNewTeam(@Body() body: {name: string}) {
        const newTeam = await this.teamService.createTeam(body.name);

        return newTeam;
    }

    @Get('role')
    public async getTeamRoles() {
        const roles = await this.teamService.getTeamRoles();
        return roles;
    }

    @Post('role')
    public async createNewTeamRole(@Body() body: {role: Role}) {
        const newRole = await this.teamService.createTeamRole(body.role);

        return newRole;
    }
}
