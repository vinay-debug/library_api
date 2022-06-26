
import { IBookCopyRepo } from "database/repository.interfaces/book.copy.repo.interface";
import { BookCopyDomainModel } from "domain.types/book.copy/book.copy.domain.model";
import { BookCopyDetailsDto } from "domain.types/book.copy/book.copy.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class BookCopyService {
    constructor(@inject('IBookCopyRepo') private _bookCopyRepo: IBookCopyRepo) {}
    
    getById = async (bookCopyId: string): Promise<BookCopyDetailsDto> => {
        const bookCopyDetailsDto: BookCopyDetailsDto = await this._bookCopyRepo.getById(bookCopyId);

        return bookCopyDetailsDto;
    };

    create = async (bookCopyDetails: BookCopyDomainModel): Promise<BookCopyDetailsDto> => {
        //  const userRole: RoleDto = await this._roleRepo.getByName(Roles.User);
        //BookDetails.RoleId = userRole.id;
        const bookCopyDetailsDto: BookCopyDetailsDto = await this._bookCopyRepo.createBookCopy(bookCopyDetails);

        return bookCopyDetailsDto;
    };

    delete = async (bookCopyId: string): Promise<boolean> => {
        return await this._bookCopyRepo.delete(bookCopyId);
    };
}
