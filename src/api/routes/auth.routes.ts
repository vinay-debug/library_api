import express, { Router } from 'express';
// import { Loader } from '../../startup/loader';
import { UserController } from '../controllers/user.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router: Router = express.Router();
    // const authenticator = Loader.authenticator;
    const controller = new UserController();

    router.post('/login', controller.loginWithPassword);
    // router.get('/', authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/auth', router);
};
