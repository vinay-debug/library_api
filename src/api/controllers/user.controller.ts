import { UserValidator } from 'api/validators/user.validator';
import { Authorizer } from 'auth/authorizer';
import { ResponseHandler } from 'common/response.handler';
import { UserDomainModel } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';
import express from 'express';
import { UserService } from 'services/user.service';
import { Loader } from 'startup/loader';

export class UserController {
    //#region member variables and constructors

    _service: UserService = null;

    _authorizer: Authorizer = null;

    constructor() {
        this._service = Loader.container.resolve(UserService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // request.context = 'User.create';

            const domainData: UserDomainModel = await UserValidator.create(request, response);

            const userdetails: UserDetailsDto = await this._service.create(domainData);

            ResponseHandler.success(
                request,
                response,
                'User created!',
                200,
                {
                    entity: userdetails,
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
}
