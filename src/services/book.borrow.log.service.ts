import { BookBorrowLogDomainModel } from "../domain.types/book.borrow.log/book.borrow.log.domain.model";
import { BookBorrowLogDetailsDto } from "../domain.types/book.borrow.log/book.borrow.log.dto";
import { inject, injectable } from "tsyringe";
import { IBookBorrowLogRepo } from "../database/repository.interfaces/book.borrow.log.repo.interface";

@injectable()
export class BookBorrowLogService {
    constructor(@inject('IBookBorrowLogRepo') private _bookBorrowLogRepo: IBookBorrowLogRepo) {}
    
    getById = async (bookBorrowLogId: string): Promise<BookBorrowLogDetailsDto> => {
        const bookBorrowLogDetailsDto: BookBorrowLogDetailsDto = await this._bookBorrowLogRepo.getById(bookBorrowLogId);

        return bookBorrowLogDetailsDto;
    };

    create = async (bookBorrowLogDetails: BookBorrowLogDomainModel): Promise<BookBorrowLogDetailsDto> => {
        const bookBorrowLogDetailsDto: BookBorrowLogDetailsDto =
        await this._bookBorrowLogRepo.createBookBorrowLog(bookBorrowLogDetails);

        return bookBorrowLogDetailsDto;
    };

    delete = async (bookBorrowLogId: string): Promise<boolean> => {
        return await this._bookBorrowLogRepo.delete(bookBorrowLogId);
    };
}
