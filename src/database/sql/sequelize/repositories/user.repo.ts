import { ApiError } from "common/api.error";
import { Logger } from "common/logger";
import { IUserRepo } from "database/repository.interfaces/user.repo.intrerface";
import { UserDomainModel } from "domain.types/user/user.domain.model";
import { UserDetailsDto } from "domain.types/user/user.dto";
import { UserMapper } from "../mapper/user.mapper";
import User from "../models/user.model";

export class UserRepo implements IUserRepo {

    async createUser(userDetails: UserDomainModel): Promise<UserDetailsDto> {

        try {
            const entity = {
                Prefix: userDetails.Prefix,
                FirstName: userDetails.FirstName,
                MiddleName: userDetails.MiddleName,
                LastName: userDetails.LastName,
                Email: userDetails.Email,
                Password: userDetails.Password,
                RoleId: userDetails.RoleId
            };
            const user: User = await User.create(entity);   //by this line we write into DB
            const dto: UserDetailsDto = await UserMapper.toDetailsDto(user);
    
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }

    }

    async findUsersByRoleId(roleid: string): Promise<UserDetailsDto[]> {
        const users: User[] = await User.findAll({
            where: {
                RoleId: roleid,
            },
        });

        const temp: Promise<UserDetailsDto>[] = users.map(async (user) => await UserMapper.toDetailsDto(user));

        const userDetailsDto: UserDetailsDto[] = await Promise.all(temp);

        return userDetailsDto;
    }
}
