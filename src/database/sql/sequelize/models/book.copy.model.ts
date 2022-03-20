/* eslint-disable indent */
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
import Book from './book.model';

@Table({
    timestamps: true,
    modelName: 'BookCopy',
    tableName: 'book_copy',
    paranoid: true,
    freezeTableName: true,
})
export default class BookCopy extends Model {
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
    @ForeignKey(() => Book)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    BookId: string;

    @BelongsTo(() => Book)
    Book: Book;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}
