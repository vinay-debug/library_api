import { BookDetailsDto } from "./book.dto";

export interface BookSearchFilters {
   Name: string;
    Summary: string;
    PublishedAt: Date;
    AuthorId:string;
    OrderBy: string;
    Order: string;
    PageIndex: number;
    ItemsPerPage: number;
}
export interface BookSearchResults {
    TotalCount: number;
    RetrievedCount: number;
    PageIndex: number;
    ItemsPerPage: number;
    Order: string;
    OrderedBy: string;
    Items: BookDetailsDto[];
}
