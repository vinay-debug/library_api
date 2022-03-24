import { Logger } from "common/logger";
import { IRoleRepo } from "database/repository.interfaces/user.role.repo.interface";
import { Roles } from "domain.types/role/role.types";
import { inject, injectable } from "tsyringe";

@injectable()
export class Seeder {
    
    constructor(@inject('IRoleRepo') private _roleRepo: IRoleRepo,) {}

    public init = async (): Promise<void> => {
        try {
            
            await this.seedDefaultRoles();
            

        } catch (error) {
            Logger.instance().log(error.message);
        }
    };

    seedDefaultRoles = async () => {

        await this._roleRepo.create({
            RoleName: Roles.Admin,
        });

        await this._roleRepo.create({
            RoleName: Roles.User,
        });
    }

}