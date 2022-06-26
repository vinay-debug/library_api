import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import BookCopy from './book.copy.model';
import User from './user.model';

@Table({
    timestamps: true,
    modelName: 'BookBorrowLog',
    tableName: 'book_borrow_log',
    paranoid: true,
    freezeTableName: true,
})
export default class BookBorrowLog extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: () => {
            return v4();
        },
        allowNull: false,
    })
        id: string;

    @IsUUID(4)
    @ForeignKey(() => BookCopy)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
        BookCopyId: string;

    @BelongsTo(() => BookCopy)
        BookCopy: BookCopy;

    @IsUUID(4)
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
        BookBorrowedByUserId: string;

    @BelongsTo(() => User)
        BookBorrowerUser: User;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
        BorrowedAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
        ReturnedAt: Date;

    @Column
    @CreatedAt
        CreatedAt: Date;

    @UpdatedAt
        UpdatedAt: Date;

    @DeletedAt
        DeletedAt: Date;
}
