import { BookBorrowLogDetailsDto } from "../../../../domain.types/book.borrow.log/book.borrow.log.dto";
import BookBorrowLog from "../models/book.borrow.log.model";

export class BookBorrowLogMapper {
    static toDetailsDto = async (entity: BookBorrowLog): Promise<BookBorrowLogDetailsDto> => {
        if (entity === null) {
            return null;
        }
        const dto: BookBorrowLogDetailsDto = {
            id:entity.id,
            UserId:entity.UserId,
            BookCopyId:entity.BookCopyId,
            BorrowedAt: entity.BorrowedAt,
            ReturnedAt: entity.ReturnedAt
        };

        return dto;
    };
}
