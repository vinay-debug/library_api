import { ApiError } from "common/api.error";
import { Logger } from "common/logger";
import { IUserRepo, UserFindOptions } from "database/repository.interfaces/user.repo.intrerface";
import { UserDomainModel } from "domain.types/user/user.domain.model";
import { UserDetailsDto } from "domain.types/user/user.dto";
import { UserSearchFilters, UserSearchResults } from "domain.types/user/user.search.types";
import { Op } from "sequelize";
import { UserMapper } from "../mapper/user.mapper";
import User from "../models/user.model";

export class UserRepo implements IUserRepo {

    getById = async (userId: string): Promise<UserDetailsDto> => {
        const user: User = await User.findOne({
            where: {
                id: userId,
            },
        });

        const details: UserDetailsDto = await UserMapper.toDetailsDto(user);

        return details;
    };

    async getUserHashedPassword(userId: string): Promise<string> {
        const user: User = await User.findOne({
            where: {
                id: userId,
            },
        });

        return user.Password;
    }

    async findOneUser(options: UserFindOptions): Promise<UserDetailsDto> {
        const DeletedAt = options.isActive === true ? { DeletedAt: null } : { DeletedAt: { [Op.not]: null } };

        let findByEmail = {};
        if (options.email) {
            findByEmail = {
                Email: options.email,
            };
        }

        let findByUserId = {};
        if (options.userId) {
            findByUserId = {
                id: options.userId,
            };
        }

        const user: User = await User.findOne({
            where: {
                ...findByEmail,
                ...findByUserId,
                ...DeletedAt,
            },
        });

        const details: UserDetailsDto = await UserMapper.toDetailsDto(user);

        return details;
    }

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

    async delete(userId: string): Promise<boolean>  {
        try {
            const deleted = await User.destroy({ where: { id:userId} });
            return  deleted === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }

    search = async (filters: UserSearchFilters): Promise<UserSearchResults> => {
        try {
            const search = { where: {} };

            if (filters.Prefix !== null) {
                search.where['Prefix'] = filters.Prefix;
            }
            if (filters.FirstName !== null) {
                search.where['FristName'] = filters.FirstName;
            }
            if (filters.MiddleName !== null) {
                search.where['MiddleName'] = filters.MiddleName;
            }
            if (filters.LastName !== null) {
                search.where['LastName'] = filters.LastName;
            }
            if (filters.Email !== null) {
                search.where['Email'] = filters.Email;
            }
            if (filters.Password !== null) {
                search.where['Password'] = filters.Password;
            }
            if (filters.RoleId !== null) {
                search.where['RoleId'] = filters.RoleId;
            }
            let orderByColum = 'CreatedAt';
            if (filters.OrderBy) {
                orderByColum = filters.OrderBy;
            }
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [[orderByColum, order]];

            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const foundResults = await User.findAndCountAll(search);

            const dtos: UserDetailsDto[] = [];
            for (const userDetails of foundResults.rows) {
                const dto = await UserMapper.toDetailsDto(userDetails);
                dtos.push(dto);
            }

            const searchResults: UserSearchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : dtos.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColum,
                Items          : dtos,
            };

            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };
}
