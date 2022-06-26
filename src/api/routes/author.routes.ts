
import { AuthorController } from '../../api/controllers/author.controller';
import express from 'express';
import { Loader } from '../../startup/loader';
export const register = (app: express.Application): void => {
    const router = express.Router();
    const authenticator = Loader.authenticator;
    const controller = new AuthorController();

    router.post('/',authenticator.authenticateUser,controller.create);
    router.get('/search', authenticator.authenticateUser,controller.search);
    router.get('/:id', authenticator.authenticateUser, controller.getById);
    router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/authors', router);
};
