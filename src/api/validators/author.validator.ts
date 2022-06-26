import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { Helper } from "../../common/helper";
import { ResponseHandler } from "../../common/response.handler";
import { AuthorDomainModel } from "../../domain.types/author/author.domain.model";
import { AuthorSearchFilters } from "../../domain.types/author/author.search";

export class AuthorValidator {
    static get = async (request: express.Request, response: express.Response): Promise<string> => {
        try {
            await param('id').trim().escape().isUUID().run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            return request.params.id;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };
    
    static create = async (request: express.Request, response: express.Response): Promise<AuthorDomainModel> => {
        try {
            await body('id').trim().run(request);
            await body('FirstName').isString().notEmpty().trim().run(request);
            await body('LastName').isString().notEmpty().trim().run(request);
            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createAuthorDomainModel: AuthorDomainModel = {
              
                FirstName: request.body.FirstName,
                LastName:request.body. LastName
            };

            return createAuthorDomainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    static search = async (request: express.Request, response: express.Response): Promise<AuthorSearchFilters> => {

        try {

            await query(' FristName').optional()
                .trim()
                .escape()
                .run(request);

            await query('LastName').optional()
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

            return AuthorValidator.getFilter(request);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private static getFilter(request): AuthorSearchFilters {

        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;
        const itemsPerPage = request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: AuthorSearchFilters = {
            FirstName           : request.query. FirstName    ?? null,
            LastName            : request.query. LasttName  ?? null,
            OrderBy         : request.query.orderBy ?? 'CreatedAt',
            Order           : request.query.order ?? 'descending',
            PageIndex       : pageIndex,
            ItemsPerPage    : itemsPerPage,
        };
        return filters;
    }
    
    static delete = async (request: express.Request, response: express.Response): Promise<string> => {
        try {
            await param('id').trim().escape().isUUID().run(request);
    
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