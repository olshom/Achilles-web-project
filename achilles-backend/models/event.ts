import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey, NonAttribute, BelongsToManySetAssociationsMixin
} from 'sequelize';
import { sequelize } from '../util/db';
import Schedule from "./schedule";
import User from "./user";
import Group from "./group";

class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare scheduleId: CreationOptional<ForeignKey<Schedule['id']> | null>;
    declare schedule?: NonAttribute<Schedule>;
    declare uniform: CreationOptional<'Gi' | 'No Gi' | 'Gi + No Gi'>;
    declare start: Date;
    declare end: Date;
    declare description: CreationOptional<string>;
    declare coachId: CreationOptional<ForeignKey<User['id']> | null>;
    declare coach?: NonAttribute<User>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare setGroups: BelongsToManySetAssociationsMixin<Group, number>;
}

Event.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
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
        coachId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
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
