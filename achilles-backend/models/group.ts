import {Model, DataTypes, NonAttribute} from 'sequelize';
import { sequelize } from '../util/db';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import User from "./user";

class Group extends Model<InferAttributes<Group, { omit: 'users' }>, InferCreationAttributes<Group, { omit: 'users' }>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;

    declare users: NonAttribute<User[]>;
}

Group.init(
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
        description: DataTypes.STRING
    },
    {
        tableName: 'groups',
        timestamps: false,
        sequelize
    });

export default Group;