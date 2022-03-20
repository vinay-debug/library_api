import { ApiError } from 'common/api.error';
import { Logger } from 'common/logger';
import { IRoleRepo } from 'database/repository.interfaces/user.role.repo.interface';
import { RoleDto } from 'domain.types/role/role.dto';
import { Roles } from 'domain.types/role/role.types';
import { RoleMapper } from '../mapper/user.role.mapper';
import Role from '../models/role.model';

export class UserRoleRepo implements IRoleRepo {
    search = async (): Promise<RoleDto[]> => {
        try {
            const role: Role[] = await Role.findAll();
            const dto: RoleDto[] = role.map((userRole) => RoleMapper.toDto(userRole));
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

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
    };

    getById(id: number): Promise<RoleDto> {
        throw new Error('Method not implemented.');
    }

    getByName = async (name: Roles): Promise<RoleDto> => {
        try {
            // select * from Role where RoleName='User' limit 1;
            const role = await Role.findOne({
                where: {
                    RoleName: name,
                },
            });
            const dto = RoleMapper.toDto(role);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };
}
