import { ApiError } from 'common/api.error';
import { Helper } from 'common/helper';
import { IUserRepo } from 'database/repository.interfaces/user.repo.intrerface';
import { IRoleRepo } from 'database/repository.interfaces/user.role.repo.interface';
import { CurrentUser } from 'domain.types/miscellaneous/current.user';
import { RoleDto } from 'domain.types/role/role.dto';
import { Roles } from 'domain.types/role/role.types';
import { UserDomainModel, UserLoginDetails } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';
import { Loader } from 'startup/loader';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserService {
    getById = async (userId: string): Promise<UserDetailsDto> => {
        const userDetailsDto: UserDetailsDto = await this._userRepo.getById(userId);

        return userDetailsDto;
    };

    constructor(
        @inject('IUserRepo') private _userRepo: IUserRepo,
        @inject('IRoleRepo') private _roleRepo: IRoleRepo,
    ) {}

    create = async (userDetails: UserDomainModel): Promise<UserDetailsDto> => {

        const userRole: RoleDto = await this._roleRepo.getByName(Roles.User);
        userDetails.RoleId = userRole.id;
        const userDetailsDto: UserDetailsDto = await this._userRepo.createUser(userDetails);
        
        return userDetailsDto;
    };

    loginWithPassword = async (loginModel: UserLoginDetails):
    Promise<{ user: UserDetailsDto; accessToken: string }> => {
        
        const user: UserDetailsDto = await this._userRepo.findOneUser({
            email: loginModel.Email,
            isActive: true,
        });

        if (user === null) {
            throw new Error('User not found.');
        }

        const hashedPassword: string = await this._userRepo.getUserHashedPassword(user.id);
        const isPasswordValid = Helper.compare(loginModel.Password, hashedPassword);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid password!');
        }

        const currentUser: CurrentUser = {
            UserId: user.id,
            DisplayName: `${user.FirstName} ${user.LastName}`,
            Email: user.Email,
            CurrentRoleId: user.RoleId,
        };

        const accessToken = await Loader.authorizer.generateUserSessionToken(currentUser);

        return { user: user, accessToken: accessToken };
    };
}
