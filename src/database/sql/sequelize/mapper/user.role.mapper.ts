import { RoleDto } from 'domain.types/role/role.dto';
import Role from '../models/role.model';

export class RoleMapper {
    static toDto(role: Role): RoleDto {
        const dto: RoleDto = {
            id: role.id,
            RoleName: role.RoleName,
        };

        return dto;
    }
}
