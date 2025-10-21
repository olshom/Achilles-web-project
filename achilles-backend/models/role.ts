import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';
import { InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import User from "./user";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare users?: NonAttribute<User[]>;
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
        }
    },
    {
        tableName: 'roles',
        sequelize,
        timestamps: false,
    });

export default Role;