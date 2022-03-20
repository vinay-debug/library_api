/* eslint-disable indent */
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
    modelName: 'Role',
    tableName: 'role',
    paranoid: true,
    freezeTableName: true,
})
export default class Role extends Model {
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
    RoleName: string;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}
