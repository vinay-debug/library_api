import { BookBorrowLogController } from '../../api/controllers/book.borrow.log.controller';
import express from 'express';
import { Loader } from '../../startup/loader';

export const register = (app: express.Application): void => {
    const router = express.Router();
    const authenticator = Loader.authenticator;
    const controller = new BookBorrowLogController();

    router.post('/',authenticator.authenticateUser,controller.create);
    router.get('/:id', authenticator.authenticateUser,controller.getById);
  
    router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/books-borrow-log', router);
};
