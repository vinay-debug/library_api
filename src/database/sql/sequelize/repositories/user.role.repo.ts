import { ApiError } from "common/api.error";
import { Logger } from "common/logger";
import { IRoleRepo } from "database/repository.interfaces/user.role.repo.interface";
import { RoleDto } from "domain.types/role/role.dto";
import { RoleMapper } from "../mapper/user.role.mapper";
import Role from "../models/role.model";

export class UserRoleRepo implements IRoleRepo {
    search(): Promise<RoleDto[]> {
        throw new Error("Method not implemented.");
    }
    create = async (roleEntity: any): Promise<RoleDto> => {
        try {
            const entity = {
                RoleName: roleEntity.RoleName,
                
            };
            const role: Role = await Role.create(entity);
            const dto = RoleMapper.toDto(role);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
    getById(id: number): Promise<RoleDto> {
        throw new Error("Method not implemented.");
    }
    getByName(name: string): Promise<RoleDto> {
        throw new Error("Method not implemented.");
    }

}