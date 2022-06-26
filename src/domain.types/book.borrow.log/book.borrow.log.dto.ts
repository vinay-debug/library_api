export interface BookBorrowLogDetailsDto {
    id: string;

    BorrowedAt: Date;

    ReturnedAt: Date;

    UserId: string;

    BookCopyId:string;
}
