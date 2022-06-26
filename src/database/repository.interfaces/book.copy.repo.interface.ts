import { BookCopyDomainModel } from "domain.types/book.copy/book.copy.domain.model";
import { BookCopyDetailsDto } from "domain.types/book.copy/book.copy.dto";

export interface IBookCopyRepo {
    getById(bookCopyId: string): Promise<BookCopyDetailsDto>;
    
    createBookCopy(bookCopyDetails: BookCopyDomainModel): Promise<BookCopyDetailsDto>;

    delete(bookCopyId: string): Promise<boolean>;

}
