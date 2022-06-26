import express from 'express';
import { BookBorrowLogValidator } from '../../api/validators/book.borrow.log.validator';
import { Authorizer } from "../../auth/authorizer";
import { ApiError } from '../../common/api.error';
import { ResponseHandler } from '../../common/response.handler';
import { BookBorrowLogDomainModel } from '../../domain.types/book.borrow.log/book.borrow.log.domain.model';
import { BookBorrowLogDetailsDto } from '../../domain.types/book.borrow.log/book.borrow.log.dto';
import { BookBorrowLogService } from '../../services/book.borrow.log.service';
import { Loader } from "../../startup/loader";
import { BaseController } from "./base.controller";

export class BookBorrowLogController extends BaseController {
    //#region member variables and constructors

    _service: BookBorrowLogService = null;

    _authorizer: Authorizer = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(BookBorrowLogService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion
    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('BookBorrowLog.GetById', request, response);

            const bookBorrowLogId: string = await BookBorrowLogValidator.get(request, response);

            const bookBorrowLogdetails: BookBorrowLogDetailsDto = await this._service.getById(bookBorrowLogId);

            ResponseHandler.success(
                request,
                response,
                'BookBorrowLog get by id!',
                200,
                {
                    entity: bookBorrowLogdetails,
                }
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await  this.setContext('BookBorrowLog.Create', request, response);
            const domainData: BookBorrowLogDomainModel = await BookBorrowLogValidator.create(request, response);

            const BookBorrowLogdetails: BookBorrowLogDetailsDto = await this._service.create(domainData);
            ResponseHandler.success(
                request,
                response,
                'BookBorrowLog created!',
                201,
                {
                    entity: BookBorrowLogdetails,
                    
                }
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('BookBorrowLog.Delete', request, response);
     
            const BookBorrowLogId: string = await BookBorrowLogValidator.delete(request, response);
     
            const deleted = await this._service.delete(BookBorrowLogId);
            if (!deleted) {
                throw new ApiError(400, 'BookBorrowLog  details cannot be deleted.');
            }
     
            ResponseHandler.success(
                request,
                response,
                'BookBorrowLog  deleted successfully!', 200, {
                    Deleted : true,
                });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
     
}
