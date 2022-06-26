import { AuthorDomainModel } from "../../domain.types/author/author.domain.model";
import { AuthorDetailsDto } from "../../domain.types/author/author.dto";
import { AuthorSearchFilters, AuthorSearchResults } from "../../domain.types/author/author.search";

export interface IAuthorRepo {
    getById(authorId: string): Promise<AuthorDetailsDto>;
    
    createAuthor(authorDetails: AuthorDomainModel): Promise<AuthorDetailsDto>;

    delete(authorId: string): Promise<boolean>;

    search(filters: AuthorSearchFilters): Promise<AuthorSearchResults>;

}
