import { Logger } from "common/logger";
import { IRolePrivilegeRepo } from "database/repository.interfaces/role.privilege.repo.interface";
import { IUserRepo } from "database/repository.interfaces/user.repo.intrerface";
import { IRoleRepo } from "database/repository.interfaces/user.role.repo.interface";
import { RoleDto } from "domain.types/role/role.dto";
import { Roles } from "domain.types/role/role.types";
import { UserDomainModel } from "domain.types/user/user.domain.model";
import { UserDetailsDto } from "domain.types/user/user.dto";
import { inject, injectable } from "tsyringe";
import * as RolePrivilegesList from '../seed.data/role.privileges.json';

@injectable()
export class Seeder {
    
    constructor(@inject('IRoleRepo') private _roleRepo: IRoleRepo,
    @inject('IUserRepo') private _userRepo: IUserRepo,
    @inject('IRolePrivilegeRepo') private _rolePrivilegeRepo: IRolePrivilegeRepo,) {}

    public init = async (): Promise<void> => {
        try {
            
            await this.seedDefaultRoles();
            await this.seedDefaultAdmin();
            await this.seedRolePrivileges();
            
        } catch (error) {
            Logger.instance().log(error.message);
        }
    };

    private seedRolePrivileges = async () => {
        const rolePrivileges = await this._rolePrivilegeRepo.search();
        if (rolePrivileges.length > 0) {
            return;
        }
        try {
            const arr = RolePrivilegesList['default'];
            for (let i = 0; i < arr.length; i++) {
                const rp = arr[i];
                const roleName = rp['Role'];
                const privileges = rp['Privileges'];

                const role = await this._roleRepo.getByName(roleName);
                if (role == null) {
                    continue;
                }
                for (const p of privileges) {
                    await this._rolePrivilegeRepo.create({
                        RoleId: role.id,
                        Privilege: p,
                    });
                }
            }
        } catch (error) {
            Logger.instance().log('Error occurred while seeding role-privileges!');
        }
        Logger.instance().log('Seeded role-privileges successfully!');
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

}
