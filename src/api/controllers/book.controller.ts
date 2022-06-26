import { Authorizer } from "auth/authorizer";
import { BookDomainModel } from "domain.types/book/book.domain.model";
import { BookDetailsDto } from "domain.types/book/book.dto";
import express from 'express';
import { BookValidator } from "../../api/validators/book.validator";
import { ApiError } from "../../common/api.error";
import { ResponseHandler } from "../../common/response.handler";
import { BookService } from "../../services/book.service";
import { Loader } from "../../startup/loader";
import { BaseController } from "./base.controller";

export class BookController extends BaseController {
    //#region member variables and constructors

    _service: BookService = null;

    _authorizer: Authorizer = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(BookService);
        this._authorizer = Loader.authorizer;
    }

    //#endregion

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Book.GetById', request, response);

            const bookId: string = await BookValidator.get(request, response);

            const bookdetails: BookDetailsDto = await this._service.getById(bookId);

            ResponseHandler.success(
                request,
                response,
                'Book get by id!',
                200,
                {
                    entity: bookdetails,
                }
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Book.Search', request, response);

            const filters = await BookValidator.search(request,response);

            const searchResults = await this._service.search(filters);

            const count = searchResults.Items.length;

            const message =
                count === 0
                    ? 'No records found!'
                    : `Total ${count} Book  details records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, {
                BookDetailsRecord : searchResults });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
  
    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Book.Create', request, response);
            const domainData: BookDomainModel = await BookValidator.create(request, response);

            const bookdetails: BookDetailsDto = await this._service.create(domainData);
            ResponseHandler.success(
                request,
                response,
                'Book created!',
                201,
                {
                    entity: bookdetails,
                }
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Book.Delete', request, response);
     
            const bookId: string = await BookValidator.delete(request, response);
     
            const deleted = await this._service.delete(bookId);
            if (!deleted) {
                throw new ApiError(400, 'Book  details cannot be deleted.');
            }
     
            ResponseHandler.success(
                request,
                response,
                'Book  deleted successfully!', 200, {
                    Deleted : true,
                });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
     
}
