import { ApiError } from "../../../../common/api.error";
import { Logger } from "../../../../common/logger";
import { IBookCopyRepo } from "database/repository.interfaces/book.copy.repo.interface";
import { BookCopyDomainModel } from "domain.types/book.copy/book.copy.domain.model";
import { BookCopyDetailsDto } from "domain.types/book.copy/book.copy.dto";
import { BookCopyMapper } from "../mapper/book.copy.mapper";
import BookCopy from "../models/book.copy.model";

export class BookCopyRepo implements IBookCopyRepo {
   
    getById = async (bookCopyId: string): Promise<BookCopyDetailsDto> => {
        const bookCopy: BookCopy = await BookCopy.findOne({
            where: {
                id: bookCopyId,
            },
        });

        const details: BookCopyDetailsDto = await BookCopyMapper.toDetailsDto(bookCopy);

        return details;
    };

    async createBookCopy(bookCopyDetails: BookCopyDomainModel):Promise<BookCopyDetailsDto>    {

        const entity = {
            BookId:bookCopyDetails.BookId,
        };
    
        const bookCopy: BookCopy = await BookCopy.create(entity);
        const dto: BookCopyDetailsDto = await BookCopyMapper.toDetailsDto(bookCopy);
        return dto;
    }

    async delete(bookCopyId: string): Promise<boolean>  {
        try {
            const deleted = await BookCopy.destroy({ where: { id:bookCopyId } });
            return  deleted === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    }
}
