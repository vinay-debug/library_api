
import { BookSearchFilters, BookSearchResults } from 'domain.types/book/book.search.type';
import { ApiError } from '../../../../common/api.error';
import { Logger } from '../../../../common/logger';
import { IBookRepo } from '../../../../database/repository.interfaces/book.repo.interface';
import { BookDomainModel } from '../../../../domain.types/book/book.domain.model';

import { BookDetailsDto } from '../../../../domain.types/book/book.dto';

import { BookMapper } from '../mapper/book.mapper';
import Book from '../models/book.model';

export class BookRepo implements IBookRepo {

    getById = async (bookId: string): Promise<BookDetailsDto> => {
        const book: Book = await Book.findOne({
            where: {
                id: bookId,
            },
        });

        const details: BookDetailsDto = await BookMapper.toDetailsDto(book);

        return details;
    };

    async createBook(bookDetails: BookDomainModel):Promise<BookDetailsDto>    {
        const entity = {
            Name: bookDetails.Name,
            Summary: bookDetails.Summary,
            PublishedAt:bookDetails.PublishedAt,
            AuthorId:bookDetails.AuthorId
        };
    
        const book: Book = await Book.create(entity);
        const dto: BookDetailsDto = await BookMapper.toDetailsDto(book);
        return dto;
    }

    search = async (filters: BookSearchFilters): Promise<BookSearchResults> => {
        try {
            const search = { where: {} };
            if (filters.Name != null) {
                search.where['Name'] = filters.Name;
            }
            if (filters.Summary !== null) {
                search.where['Summary'] = filters.Summary;
            }
            if (filters.PublishedAt !== null) {
                search.where['PublishedAt'] = filters.PublishedAt;
            }
            if (filters.AuthorId !== null) {
                search.where['AuthorId'] = filters.AuthorId;
            }
            let orderByColum = 'CreatedAt';
            if (filters.OrderBy) {
                orderByColum = filters.OrderBy;
            }
            let order = 'ASC';
            if (filters.Order === 'descending') {
                order = 'DESC';
            }
            search['order'] = [[orderByColum, order]];

            let limit = 25;
            if (filters.ItemsPerPage) {
                limit = filters.ItemsPerPage;
            }
            let offset = 0;
            let pageIndex = 0;
            if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                offset = pageIndex * limit;
            }
            search['limit'] = limit;
            search['offset'] = offset;

            const foundResults = await Book.findAndCountAll(search);

            const dtos: BookDetailsDto[] = [];
            for (const bookDetails of foundResults.rows) {
                const dto = await BookMapper.toDetailsDto(bookDetails);
                dtos.push(dto);
            }

            const searchResults: BookSearchResults = {
                TotalCount     : foundResults.count,
                RetrievedCount : dtos.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColum,
                Items          : dtos,
            };

            return searchResults;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    async delete(bookId: string): Promise<boolean>  {
        try {
            const deleted = await Book.destroy({ where: { id:bookId } });
            return  deleted === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
}
