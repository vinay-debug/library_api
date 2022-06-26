import { AuthorDetailsDto } from "./author.dto";

export interface AuthorSearchFilters {
    FirstName: string;
    LastName: string;
    OrderBy: string;
    Order: string;
    PageIndex: number;
    ItemsPerPage: number;
}
export interface AuthorSearchResults {
    TotalCount: number;
    RetrievedCount: number;
    PageIndex: number;
    ItemsPerPage: number;
    Order: string;
    OrderedBy: string;
    Items: AuthorDetailsDto[];
}
