import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamDto, TeamRoleDto, Role } from '../../models/team';
import { TeamService } from '../../services/team/team.service';

@Controller('team')
export class TeamController {

    constructor(
        private teamService: TeamService
    ) { }

    @Get()
    public async getTeams(): Promise<TeamDto[]> {
        const teams = await this.teamService.getTeams();
        return teams;
    }

    @Post()
    public async createNewTeam(@Body() body: {name: string}): Promise<TeamDto> {
        const newTeam = await this.teamService.createTeam(body.name);

        return newTeam;
    }

    @Get('role')
    public async getTeamRoles(): Promise<TeamRoleDto[]> {
        const roles = await this.teamService.getTeamRoles();
        return roles;
    }

    @Post('role')
    public async createNewTeamRole(@Body() body: {role: Role}): Promise<TeamRoleDto> {
        const newRole = await this.teamService.createTeamRole(body.role);

        return newRole;
    }
}
