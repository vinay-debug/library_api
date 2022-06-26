import { ApiError } from "../../../../common/api.error";
import { Logger } from "../../../../common/logger";
import { IBookBorrowLogRepo } from "../../../../database/repository.interfaces/book.borrow.log.repo.interface";
import { BookBorrowLogDomainModel } from "../../../../domain.types/book.borrow.log/book.borrow.log.domain.model";
import { BookBorrowLogDetailsDto } from "../../../../domain.types/book.borrow.log/book.borrow.log.dto";
import { BookBorrowLogMapper } from "../mapper/book.borrow.log.mapper";
import BookBorrowLog from "../models/book.borrow.log.model";

export class BookBorrowLogRepo implements IBookBorrowLogRepo {
   
    getById = async (bookBorrowLogId: string): Promise<BookBorrowLogDetailsDto> => {
        const bookBorrowLog: BookBorrowLog = await BookBorrowLog.findOne({
            where: {
                id: bookBorrowLogId,
            },
        });

        const details: BookBorrowLogDetailsDto = await BookBorrowLogMapper.toDetailsDto(bookBorrowLog);

        return details;
    };

    async createBookBorrowLog(bookBorrowLogDetails: BookBorrowLogDomainModel):Promise<BookBorrowLogDetailsDto>    {

        const entity = {
            UserId:bookBorrowLogDetails.UserId,
            BookCopyId:bookBorrowLogDetails.BookCopyId,
        };
    
        const bookBorrowLog: BookBorrowLog = await BookBorrowLog.create(entity);
        const dto: BookBorrowLogDetailsDto = await BookBorrowLogMapper.toDetailsDto(bookBorrowLog);
        return dto;
    }

    async delete(bookBorrowLogId: string): Promise<boolean>  {
        try {
            const deleted = await BookBorrowLog.destroy({ where: { id:bookBorrowLogId } });
            return  deleted === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
}
