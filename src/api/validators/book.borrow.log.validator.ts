import { Helper } from '../../common/helper';
import { ResponseHandler } from '../../common/response.handler';
import { BookBorrowLogDomainModel } from '../../domain.types/book.borrow.log/book.borrow.log.domain.model';
import express from 'express';
import { body,param, validationResult } from "express-validator";

export class BookBorrowLogValidator {
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
    
    static create = async (request: express.Request, response: express.Response): Promise<BookBorrowLogDomainModel> => {
        try {
            
            await body('BookBorrowedByUserId').isString()
                .notEmpty()
                .trim()
                .run(request);

            await body('BookCopyId').isString()
                .notEmpty()
                .trim()
                .run(request);
            await body('BorrowedAt').trim()
                .run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createBookBorrowLogDomainModel: BookBorrowLogDomainModel = {
                BookBorrowedByUserId: request.body.BookBorrowedByUserId,
                BookCopyId: request.body.BookCopyId,
                BorrowedAt: request.body.BorrowedAt,
            };

            return createBookBorrowLogDomainModel;
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
