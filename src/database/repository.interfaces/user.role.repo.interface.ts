import { RoleDto } from 'domain.types/role/role.dto';

export interface IRoleRepo {
    search(): Promise<RoleDto[]>;

    create(entity: any): Promise<RoleDto>;

    getById(id: number): Promise<RoleDto>;

    getByName(name: string): Promise<RoleDto>;
}
