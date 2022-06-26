import { Helper } from "../../common/helper";
import { ResponseHandler } from "../../common/response.handler";
import { BookCopyDomainModel } from "domain.types/book.copy/book.copy.domain.model";
import express from 'express';
import { body,param, validationResult } from "express-validator";

export class BookCopyValidator {
    static get = async (request: express.Request, response: express.Response): Promise<string> => {
        try {
            await param('id').trim()
                .escape()
                .isUUID()
                .run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    static create = async (request: express.Request, response: express.Response): Promise<BookCopyDomainModel> => {
        try {
            await body('id').trim()
                .run(request);
            await body('BookId').isUUID()
                .notEmpty()
                .trim()
                .run(request);
 
            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createBookCopyDomainModel: BookCopyDomainModel = {
                BookId: request.body.BookId,
            };

            return createBookCopyDomainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    static delete = async (request: express.Request, response: express.Response): Promise<string> => {
        try {
            await param('id').trim()
                .escape()
                .isUUID()
                .run(request);
    
            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }
    
            return request.params.id;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
}
