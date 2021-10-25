export interface TeamDto {
    id: number;
    team_name: string;
}

export interface TeamRoleDto {
    id: number;
    role: Role;
}

export interface AssignedTeam {
    team_id: number;
    team_name: string;
    role: Role;
}

export type Role = 'lead'|'member';
