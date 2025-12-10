import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    HasManyAddAssociationsMixin, BelongsToManySetAssociationsMixin, HasManyCreateAssociationMixin,
} from 'sequelize';
import { sequelize } from '../util/db';
import Group from "./group";

import EventEntry from "./eventEntry";

class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare isRecurring: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare addGroups: HasManyAddAssociationsMixin<Group, number>;

    declare setGroups: BelongsToManySetAssociationsMixin<Group, number>;
    declare createEventEntry: HasManyCreateAssociationMixin<EventEntry,'eventId'>;
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
    isRecurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
},
{sequelize, underscored: true, timestamps: true, modelName: 'event'}
)

export default Event;