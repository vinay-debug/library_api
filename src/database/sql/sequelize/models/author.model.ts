import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    IsUUID,
    Length,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { v4 } from 'uuid';

@Table({
    timestamps: true,
    modelName: 'Person',
    tableName: 'persons',
    paranoid: true,
    freezeTableName: true,
})
export default class Author extends Model {
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

    @Length({ max: 16 })
    @Column({
        type: DataType.STRING(16),
        allowNull: true,
    })
        Prefix: string;

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: false,
    })
        FirstName: string;

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: true,
    })
        MiddleName: string;

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: true,
    })
        LastName: string;

    @Column
    @CreatedAt
        CreatedAt: Date;

    @UpdatedAt
        UpdatedAt: Date;

    @DeletedAt
        DeletedAt: Date;
}
