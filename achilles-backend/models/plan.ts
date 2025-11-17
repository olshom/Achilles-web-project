import {Model, DataTypes, NonAttribute} from 'sequelize';
import { sequelize } from '../util/db';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import User from "./user";

class Plan extends Model<InferAttributes<Plan, { omit: 'users' }>, InferCreationAttributes<Plan, { omit: 'users' }>> {
    declare id: CreationOptional<number>;
    declare type: string;
    declare price: number;
    declare description: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare users?: NonAttribute<User[]>
}

Plan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: new DataTypes.STRING(64),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'plans',
        sequelize,
        underscored: true,
        timestamps: true,
    });

export default Plan;