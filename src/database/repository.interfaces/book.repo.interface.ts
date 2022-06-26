import { BookDomainModel } from "../../domain.types/book/book.domain.model";
import { BookDetailsDto } from "../../domain.types/book/book.dto";
import { BookSearchFilters, BookSearchResults } from "../../domain.types/book/book.search.type";
export interface IBookRepo {
    getById(bookId: string): Promise<BookDetailsDto>;

    createBook(bookDetails: BookDomainModel): Promise<BookDetailsDto>;
    search(filters: BookSearchFilters): Promise<BookSearchResults>;
     
    delete(bookId: string): Promise<boolean>;

}
