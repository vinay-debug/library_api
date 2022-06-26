import { ApiError } from "../../../../common/api.error";
import { Logger } from "../../../../common/logger";
import { IAuthorRepo } from "../../../../database/repository.interfaces/author.repo.interface";
import { AuthorDomainModel } from "../../../../domain.types/author/author.domain.model";
import { AuthorDetailsDto } from "../../../../domain.types/author/author.dto";
import { AuthorSearchFilters, AuthorSearchResults } from "../../../../domain.types/author/author.search";
import { AuthorMapper } from "../mapper/author.mapper";
import Author from "../models/author.model";

export class AuthorRepo implements IAuthorRepo {
    
    getById = async (authorId: string): Promise<AuthorDetailsDto> => {
        const author: Author = await Author.findOne({
            where: {
                id: authorId,
            },
        });

        const details: AuthorDetailsDto = await AuthorMapper.toDetailsDto(author);

        return details;
    };

    createAuthor = async (authorDetails: AuthorDomainModel):Promise<AuthorDetailsDto> => {
        const entity = {
           
            FirstName: authorDetails.FirstName,
            LastName: authorDetails.LastName,
        };
    
        const author: Author = await Author.create(entity);
        const dto: AuthorDetailsDto = await AuthorMapper.toDetailsDto(author);
        return dto;
    };
    
    search = async (filters: AuthorSearchFilters): Promise<AuthorSearchResults> => {
        try {
            const search = { where: {} };

            if (filters.FirstName !== null) {
                search.where['FristName'] = filters.FirstName;
            }
    
            if (filters.LastName !== null) {
                search.where['LastName'] = filters.LastName;
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

            const foundResults = await Author.findAndCountAll(search);

            const dtos: AuthorDetailsDto[] = [];
            for (const authorDetails of foundResults.rows) {
                const dto = await AuthorMapper.toDetailsDto(authorDetails);
                dtos.push(dto);
            }

            const searchResults: AuthorSearchResults = {
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

    async delete(authorId : string): Promise<boolean>  {
        try {
            const deleted = await Author.destroy({ where: { id:authorId } });
            return  deleted === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
}
