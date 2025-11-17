import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    HasManyAddAssociationsMixin
} from 'sequelize';
import { sequelize } from '../util/db';
import Group from "./group";

class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id: CreationOptional<number>;
    declare eventType: string;
    declare uniform: 'Gi'|'No Gi'| 'Gi + No Gi';
    declare start: string;
    declare end: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare description: CreationOptional<string>;
    declare addGroups: HasManyAddAssociationsMixin<Group, number>
}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uniform: {
        type: DataTypes.STRING,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
},
{sequelize, underscored: true, timestamps: true, modelName: 'event'}
)

export default Event;