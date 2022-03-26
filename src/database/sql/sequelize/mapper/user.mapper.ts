import { UserDetailsDto } from "domain.types/user/user.dto";
import User from "../models/user.model";

export class UserMapper {
    static toDetailsDto = async (entity: User) : Promise<UserDetailsDto> => {
        const dto: UserDetailsDto = {
            id: entity.id,
            Prefix: entity.Prefix,
            FirstName: entity.FirstName,
            MiddleName: entity.MiddleName,
            LastName: entity.LastName,
            Email: entity.Email,
            CreatedAt: entity.createdAt,
            UpdatedAt: entity.deletedAt,
            DeletedAt: entity.deletedAt,
            RoleId: entity.RoleId
        };
        return dto;
    };
}
