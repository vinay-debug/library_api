/* eslint-disable indent */
import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    IsUUID,
    Length,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import Author from './author.model';

@Table({
    timestamps: true,
    modelName: 'Book',
    tableName: 'book',
    paranoid: true,
    freezeTableName: true,
})
export default class Book extends Model {
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

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: false,
    })
    Name: string;

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: true,
    })
    Summary: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    PublishedAt: Date;

    @IsUUID(4)
    @ForeignKey(() => Author)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    AuthorId: string;

    @BelongsTo(() => Author)
    Author: Author;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}
