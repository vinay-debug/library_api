import { BookCopyDetailsDto } from "domain.types/book.copy/book.copy.dto";
import BookCopy from "../models/book.copy.model";

export class BookCopyMapper {
    static toDetailsDto = async (entity: BookCopy): Promise<BookCopyDetailsDto> => {
        if (entity === null) {
            return null;
        }
        const dto: BookCopyDetailsDto = {
            id:entity.id,
            BookId:entity.BookId,
            CreatedAt: entity.createdAt,
            UpdatedAt: entity.updatedAt
        };

        return dto;
    };
}
