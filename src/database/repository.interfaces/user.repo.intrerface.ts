import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';

export interface IUserRepo {
    findUsersByRoleId(id: string): Promise<UserDetailsDto[]>;
    createUser(userDetails: UserDomainModel): Promise<UserDetailsDto>;
}
