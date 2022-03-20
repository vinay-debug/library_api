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
    modelName       : 'Book',
    tableName       : 'book',
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


    @Column({
        type      : DataType.UUID,
        allowNull : true,
    })
    Name: string;

    @Length({ min: 10, max: 13 })
    @Column({
        type      : DataType.UUID,
        allowNull : true,
    })
    ISBN: string;

    @IsUUID(4)
    @Column({
        type      : DataType.UUID,
        allowNull : true,
    })
    AuthorId: string;


    @Length({ max: 100 })
    @Column({
        type      : DataType.STRING(100),
        allowNull : true
    })
    Summary: string;

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

    @DeletedAt
    DeletedAt: Date;

}