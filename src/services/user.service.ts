import { IRoleRepo } from 'database/repository.interfaces/user.role.repo.interface';
import { RoleDto } from 'domain.types/role/role.dto';
import { Roles } from 'domain.types/role/role.types';
import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';
import { inject, injectable } from 'tsyringe';
import { IUserRepo } from '../database/repository.interfaces/user.repo.intrerface';

@injectable()
export class UserService {
    constructor(@inject('IUserRepo') private _userRepo: IUserRepo, @inject('IRoleRepo') private _roleRepo: IRoleRepo) {}

    create = async (userDetails: UserDomainModel): Promise<UserDetailsDto> => {
        const userRole: RoleDto = await this._roleRepo.getByName(Roles.User);
        userDetails.RoleId = userRole.id;
        const userDetailsDto: UserDetailsDto = await this._userRepo.createUser(userDetails);

        return userDetailsDto;
    };
}
