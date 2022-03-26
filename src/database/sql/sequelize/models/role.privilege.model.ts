import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    IsUUID,
    PrimaryKey,
    ForeignKey,
} from 'sequelize-typescript';

import { v4 } from 'uuid';
import Role from './role.model';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps: true,
    modelName: 'RolePrivilege',
    tableName: 'role_privileges',
    paranoid: true,
    freezeTableName: true,
})
export default class RolePrivilege extends Model {
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

    @Column({
        type: DataType.STRING(256),
        allowNull: false,
    })
        Privilege: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        RoleId: string;

    @Column
    @CreatedAt
        CreatedAt: Date;

    @UpdatedAt
        UpdatedAt: Date;

    @DeletedAt
        DeletedAt: Date;
}
