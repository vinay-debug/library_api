import { Authorizer } from "auth/authorizer";
import { Loader } from "../../startup/loader";
import express from 'express';
import { BaseController } from "./base.controller";
import { ResponseHandler } from "../../common/response.handler";
import { BookCopyDetailsDto } from "domain.types/book.copy/book.copy.dto";
import { BookCopyDomainModel } from "domain.types/book.copy/book.copy.domain.model";
import { BookCopyService } from "../../services/book.copy.service";
import { BookCopyValidator } from "../../api/validators/book.copy.validator";
import { ApiError } from "../../common/api.error";

export class BookCopyController extends BaseController {
    //#region member variables and constructors

    _service: BookCopyService = null;

    _authorizer: Authorizer = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(BookCopyService);
        this._authorizer = Loader.authorizer;
    }

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('BookCopy.GetById', request, response);

            const bookCopyId: string = await BookCopyValidator.get(request, response);

            const bookCopydetails: BookCopyDetailsDto = await this._service.getById(bookCopyId);

            ResponseHandler.success(
                request,
                response,
                'BookCopy get by id!',
                200,
                {
                    entity: bookCopydetails,
                },
                false
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        throw new Error('Method not implemented.');
    };
  
    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('BookCopy.Create', request, response);
            const domainData: BookCopyDomainModel = await BookCopyValidator.create(request, response);

            const bookCopydetails: BookCopyDetailsDto = await this._service.create(domainData);
            ResponseHandler.success(
                request,
                response,
                'BookCopy Created!',
                201,
                {
                    entity: bookCopydetails,
                    
                }
            );
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('BookCopy.Delete', request, response);
     
            const bookCopyId: string = await BookCopyValidator.delete(request, response);
     
            const deleted = await this._service.delete(bookCopyId);
            if (!deleted) {
                throw new ApiError(400, 'BookCopy cannot be deleted.');
            }
     
            ResponseHandler.success(
                request,
                response,
                'BookCopy deleted successfully!', 200, {
                    Deleted : true,
                });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
