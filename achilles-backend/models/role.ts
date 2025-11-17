import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';
import { InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import User from "./user";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare users?: NonAttribute<User[]>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(64),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'roles',
        sequelize,
        underscored: true,
        timestamps: true,
    });

export default Role;