/* eslint-disable newline-per-chained-call */
import { Helper } from 'common/helper';
import { ResponseHandler } from 'common/response.handler';
import { UserDomainModel, UserLoginDetails } from 'domain.types/user/user.domain.model';
import { UserSearchFilters } from 'domain.types/user/user.search.types';
import express from 'express';
import { body, oneOf, param, query, validationResult } from 'express-validator';

export class UserValidator {
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

    static loginWithPassword = async (
        request: express.Request,
        response: express.Response
    ): Promise<UserLoginDetails> => {
        try {
            await body('Email').isString().notEmpty().trim().run(request);
            await body('Password').isString().notEmpty().trim().run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const domainModel: UserLoginDetails = {
                Email: request.body.Email,
                Password: request.body.Password,
            };

            return domainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    static create = async (request: express.Request, response: express.Response): Promise<UserDomainModel> => {
        try {
            await body('Prefix').optional().trim().run(request);
            await body('FirstName').isString().notEmpty().trim().run(request);
            await body('MiddleName').optional().trim().run(request);
            await body('LastName').isString().notEmpty().trim().run(request);
            await body('Email').isEmail().trim().run(request);
            await body('Password').isString().notEmpty().trim().run(request);

            const result = validationResult(request);
            if (!result.isEmpty()) {
                Helper.handleValidationError(result);
            }

            const createUserDomainModel: UserDomainModel = {
                Prefix: request.body.Prefix,
                FirstName: request.body.FirstName,
                MiddleName: request.body.MiddleName,
                LastName: request.body.LastName,
                Email: request.body.Email,
                Password: request.body.Password,
                RoleId: request.body.RoleId ?? null,
            };

            return createUserDomainModel;
        } catch (err) {
            ResponseHandler.handleError(request, response, err);
        }
    };

    static search = async (request: express.Request, response: express.Response): Promise<UserSearchFilters> => {
        
        try {

            await query('Prefix').optional()
                .trim()
                .escape()
                .run(request);

            await query('FristName').optional()
                .trim()
                .escape()
                .run(request);
            await query('MiddleName').optional()
                .trim()
                .escape()
                .run(request);

            await query('LastName').optional()
                .trim()
                .escape()
                .run(request);

            await query('Email').optional()
                .trim()
                .escape()
                .run(request);

            await query('Password').optional()
                .isUUID()
                .trim()
                .escape()
                .run(request);

            await query('RoleId').optional()
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

            return UserValidator.getFilter(request);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private static getFilter(request): UserSearchFilters {

        const pageIndex = request.query.pageIndex !== 'undefined' ? parseInt(request.query.pageIndex as string, 10) : 0;
        const itemsPerPage = request.query.itemsPerPage !== 'undefined' ? parseInt(request.query.itemsPerPage as string, 10) : 25;

        const filters: UserSearchFilters = {
            Prefix: request.query.Prefix ?? null,
            FirstName: request.query.FirstName ?? null,
            MiddleName: request.query.MiddleName ?? null,
            LastName: request.query.LastName ?? null,
            Email: request.query.Email ?? null,
            Password: request.query.Password ?? null,
            RoleId:request.query.RoleId ?? null,
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
