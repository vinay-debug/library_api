import { IUserRepo } from 'database/repository.interfaces/user.repo.intrerface';
import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserService {

    create = async ():
    Promise<any> => {
        const apiResponse = {
            status: 200,
            entity: {
                name: 'vinay baranwal',
                designation: 'software developer'
            }
        };
        return apiResponse
    };
}
