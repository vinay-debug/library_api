import {
    BelongsTo,
    Column, CreatedAt, DataType, DeletedAt,
    ForeignKey,IsDate,
    IsUUID, Length, Model, PrimaryKey, Table, UpdatedAt
} from 'sequelize-typescript';
import { v4 } from 'uuid';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps      : true,
    modelName       : 'BookCopy',
    tableName       : 'book_copy',
    paranoid        : true,
    freezeTableName : true
})
export default class Address extends Model {

    @IsUUID(4)
    @PrimaryKey
    @Column({
        type         : DataType.UUID,
        defaultValue : () => { return v4(); },
        allowNull    : false
    })
    id: string;

    @IsUUID(4)
    @PrimaryKey
    @Column({
        type      : DataType.UUID,
        allowNull : true,
    })
    BookId: string;

    @IsDate
    @Column({
        type      : DataType.DATE,
        allowNull : true
    })
    PublishedOn: Date;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

}