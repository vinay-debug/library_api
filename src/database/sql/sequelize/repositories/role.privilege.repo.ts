import { IRolePrivilegeRepo } from "database/repository.interfaces/role.privilege.repo.interface";
import { RolePrivilegeDto } from "domain.types/role/role.privilege.dto";

export class RolePrivilegeRepo implements IRolePrivilegeRepo {
    create(entity: any): Promise<RolePrivilegeDto> {
        throw new Error("Method not implemented.");
    }

    getById(id: string): Promise<RolePrivilegeDto> {
        throw new Error("Method not implemented.");
    }

    search(): Promise<RolePrivilegeDto[]> {
        throw new Error("Method not implemented.");
    }

    getPrivilegesForRole(roleId: string): Promise<RolePrivilegeDto[]> {
        throw new Error("Method not implemented.");
    }

    hasPrivilegeForRole(roleId: string, privilege: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
