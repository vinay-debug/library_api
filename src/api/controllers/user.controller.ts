import { Authorizer } from '../../auth/authorizer';
import express from 'express';
import { UserService } from '../../services/user.service';
import { Loader } from '../../startup/loader';
import { ResponseHandler } from 'common/response.handler';
import { ApiError } from 'common/api.error';
import { UserValidator } from 'api/validators/user.validator';
import { UserLoginDetails } from 'domain.types/user/user.domain.model';

export class UserController {

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

    //#region member variables and constructors

    _service: UserService = null;

    constructor() {
        this._service = Loader.container.resolve(UserService);
    }

    //#endregion

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new ApiError(500, 'Cannot create user!');
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new ApiError(500, 'Cannot create user!');
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new ApiError(500, 'Cannot create user!');
    };

    create = async (request: express.Request, response: express.Response) => {
        try {
            // const apiResponse = {
            //     status: 200,
            //     entity: {
            //         name: 'vinay baranwal',
            //         designation: 'software developer'
            //     }
            // };
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
}
