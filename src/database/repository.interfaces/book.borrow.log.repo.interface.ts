import { BookBorrowLogDomainModel } from "../../domain.types/book.borrow.log/book.borrow.log.domain.model";
import { BookBorrowLogDetailsDto } from "../../domain.types/book.borrow.log/book.borrow.log.dto";

export interface IBookBorrowLogRepo {
    getById(bookBorrowLogId: string): Promise<BookBorrowLogDetailsDto>;
    
    createBookBorrowLog(bookBorrowLogDetails: BookBorrowLogDomainModel): Promise<BookBorrowLogDetailsDto>;

    delete(bookBorrowLogId: string): Promise<boolean>;

}
