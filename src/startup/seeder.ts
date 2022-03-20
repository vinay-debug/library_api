import { Logger } from 'common/logger';
import { IUserRepo } from 'database/repository.interfaces/user.repo.intrerface';
import { IRoleRepo } from 'database/repository.interfaces/user.role.repo.interface';
import { RoleDto } from 'domain.types/role/role.dto';
import { Roles } from 'domain.types/role/role.types';
import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class Seeder {
    constructor(@inject('IUserRepo') private _userRepo: IUserRepo, @inject('IRoleRepo') private _roleRepo: IRoleRepo) {}

    public init = async (): Promise<void> => {
        try {
            await this.seedDefaultRoles();
            await this.seedDefaultAdmin();
        } catch (error) {
            Logger.instance().log(error.message);
        }
    };

    seedDefaultAdmin = async () => {
        const adminRole: RoleDto = await this._roleRepo.getByName(Roles.Admin);
        const admins: UserDetailsDto[] = await this._userRepo.findUsersByRoleId(adminRole.id);
        if (admins.length > 0) {
            return;
        }
        const admin: UserDomainModel = {
            Prefix: 'Mr.',
            FirstName: 'Kiran',
            MiddleName: '',
            LastName: 'Kharade',
            Email: 'Kiran.kharade@yopmail.com',
            Password: 'Test@123',
            RoleId: adminRole.id,
        };

        await this._userRepo.createUser(admin);
    };

    seedDefaultRoles = async () => {
        const existing: RoleDto[] = await this._roleRepo.search();
        if (existing.length > 0) {
            return;
        }

        await this._roleRepo.create({
            RoleName: Roles.Admin,
        });

        await this._roleRepo.create({
            RoleName: Roles.User,
        });
    };
}
