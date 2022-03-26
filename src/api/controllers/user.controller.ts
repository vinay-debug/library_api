import { Authorizer } from '../../auth/authorizer';
import express from 'express';
import { UserService } from '../../services/user.service';
import { Loader } from '../../startup/loader';
import { ResponseHandler } from 'common/response.handler';
import { ApiError } from 'common/api.error';
import { UserValidator } from 'api/validators/user.validator';
import { UserLoginDetails } from 'domain.types/user/user.domain.model';
import { UserDetailsDto } from 'domain.types/user/user.dto';
import { BaseController } from './base.controller';

export class UserController extends BaseController {

    //#region member variables and constructors

    _service: UserService = null;

    _authorizer: Authorizer = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(UserService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new ApiError(500, 'Cannot create user!');
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('User.getById', request, response);

            const userId: string = await UserValidator.get(request, response);

            const userdetails: UserDetailsDto = await this._service.getById(userId);

            ResponseHandler.success(
                request,
                response,
                'User retrived successfully by id!',
                200,
                {
                    entity: userdetails,
                },
                true
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new ApiError(500, 'Cannot create user!');
    };

    create = async (request: express.Request, response: express.Response) => {
        try {
            this.setContext('User.create', request, response);
            const model = await UserValidator.create(request,response);
            const userdetails = await this._service.create(model);
            ResponseHandler.success(
                request,
                response,
                'User created successfully!',
                200,
                {
                    entity: userdetails,
                }),
            false;
        }
        catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    loginWithPassword = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // request.context = 'User.create';

            const domainData: UserLoginDetails = await UserValidator.loginWithPassword(request, response);

            const userdetails = await this._service.loginWithPassword(domainData);

            const message = `User '${userdetails.user.FirstName}' logged in successfully!`;

            const data = {
                AccessToken: userdetails.accessToken,
                User: userdetails.user,
            };

            ResponseHandler.success(
                request,
                response,
                message,
                200,
                {
                    entity: data,
                },
                true
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
}
