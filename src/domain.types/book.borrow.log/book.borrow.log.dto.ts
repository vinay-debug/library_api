export interface BookBorrowLogDetailsDto {
    id: string;

    BorrowedAt: Date;

    ReturnedAt: Date;

    BookBorrowedByUserId: string;

    BookCopyId:string;
}
