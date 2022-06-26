import { inject, injectable } from "tsyringe";
import { IAuthorRepo } from "../database/repository.interfaces/author.repo.interface";
import { IBookRepo } from "../database/repository.interfaces/book.repo.interface";
import { BookDomainModel } from "../domain.types/book/book.domain.model";
import { BookDetailsDto } from "../domain.types/book/book.dto";
import { BookSearchFilters, BookSearchResults } from "../domain.types/book/book.search.type";

@injectable()
export class BookService {
    constructor(@inject('IBookRepo') private _bookRepo: IBookRepo,
                @inject('IAuthorRepo') private _authorRepo: IAuthorRepo) {}
    
    getById = async (bookId: string): Promise<BookDetailsDto> => {
        const bookDetailsDto: BookDetailsDto = await this._bookRepo.getById(bookId);

        return bookDetailsDto;
    };

    create = async (bookDetails: BookDomainModel): Promise<BookDetailsDto> => {
        const bookDetailsDto: BookDetailsDto = await this._bookRepo.createBook(bookDetails);

        return bookDetailsDto;
    };

    search = async (filters: BookSearchFilters): Promise<BookSearchResults> => {
        const items = [];
        const results = await this._bookRepo.search(filters);
        for await (const dto of results.Items) {
            items.push(dto);
        }
        results.Items = items;
        return results;
    };

    delete = async (bookId: string): Promise<boolean> => {
        return await this._bookRepo.delete(bookId);
    };
}
