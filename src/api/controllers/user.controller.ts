import { Authorizer } from '../../auth/authorizer';
import express from 'express';
import { UserService } from '../../services/user.service';
import { Loader } from '../../startup/loader';
import { ResponseHandler } from 'common/response.handler';

export class UserController {
    //#region member variables and constructors

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

    create = async (request: express.Request, response: express.Response) => {
        try {
            const apiResponse = {
                status: 200,
                entity: {
                    name: 'vinay baranwal',
                    designation: 'software developer'
                }
            };
            ResponseHandler.success(request, response, 'User created successfully!', 200, apiResponse )
        }
        catch (err) {
            ResponseHandler.handleError(request, response, err)
        }
    };
}
