import express from 'express';
import { Logger } from '../../common/logger';
import { register as userRegister } from './user.routes';
import { register as userAuthLogin } from './auth.routes';

export class Router {
    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message : `API [Version ${process.env.API_VERSION}]`,
                    });
                });

                userRegister(this._app);
                userAuthLogin(this._app);

                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };
}
