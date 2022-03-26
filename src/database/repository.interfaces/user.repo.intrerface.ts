import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';

export interface IUserRepo {
    getUserHashedPassword(id: string): string | PromiseLike<string>;
    findOneUser(arg0: { email: string; isActive: boolean; }): UserDetailsDto | PromiseLike<UserDetailsDto>;
    findUsersByRoleId(id: string): Promise<UserDetailsDto[]>;
    createUser(userDetails: UserDomainModel): Promise<UserDetailsDto>;
}

export class UserFindOptions {
    userId?: string;

    email?: string;

    isActive: boolean;
}
