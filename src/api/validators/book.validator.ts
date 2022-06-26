import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { Helper } from "../../common/helper";
import { ResponseHandler } from "../../common/response.handler";
import { BookDomainModel } from "../../domain.types/book/book.domain.model";
import { BookSearchFilters } from "../../domain.types/book/book.search.type";

export class BookValidator {
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
    
    static create = async (request: express.Request, response: express.Response): Promise<BookDomainModel> => {
        try {
            await body('Name').isString()
                . notEmpty()
                .trim()
                .run(request);
            await body('Summary').optional()
                .trim()
                .run(request);
            await body('PublishedAt').notEmpty()
                .trim()
                .run(request);
            await body('AuthorId').isUUID()
                .notEmpty()
                .trim()
                .run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createBookDomainModel: BookDomainModel = {
               
                Name:  request.body. Name,
                Summary:  request.body.Summary,
                PublishedAt:  request.body.PublishedAt ,
                AuthorId: request.body.AuthorId ,
            };

            return createBookDomainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    static search = async (request: express.Request, response: express.Response): Promise<BookSearchFilters> => {

        try {

            await query(' Name').optional()
                .trim()
                .escape()
                .run(request);

            await query('Summary').optional()
                .trim()
                .escape()
                .run(request);
            await query('PublishedAt').optional()
                .trim()
                .escape()
                .run(request);

            await query('AuthorId').optional()
                .trim()
                .escape()
                .run(request);

            await query('orderBy').optional()
                .trim()
                .escape()
                .run(request);

            await query('order').optional()
                .trim()
                .escape()
                .run(request);

            await query('pageIndex').optional()
                .isInt()
                .trim()
                .escape()
                .run(request);

            await query('itemsPerPage').optional()
                .isInt()
                .trim()
                .escape()
                .run(request);
            await query('full').optional()
                .isBoolean()
                .run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return BookValidator.getFilter(request);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private static getFilter(request): BookSearchFilters {

        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;
        const itemsPerPage = request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: BookSearchFilters = {
            Name            : request.query.Name ?? null,
            Summary         : request.query. Summary ?? null,
            PublishedAt     : request.query.PublishedAt ?? null,
            AuthorId        : request.query . AuthorId ?? null,
            OrderBy         : request.query.orderBy ?? 'CreatedAt',
            Order           : request.query.order ?? 'descending',
            PageIndex       : pageIndex,
            ItemsPerPage    : itemsPerPage,
        };
        return filters;
    }

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
