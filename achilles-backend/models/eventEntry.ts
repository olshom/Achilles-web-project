import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey, NonAttribute
} from 'sequelize';
import { sequelize } from '../util/db';
import Event from "./event";



class EventEntry extends Model<InferAttributes<EventEntry>, InferCreationAttributes<EventEntry>> {
    declare id: CreationOptional<number>;
    declare eventId: ForeignKey<Event['id']>;
    declare event?: NonAttribute<Event>;
    declare uniform: CreationOptional<'Gi' | 'No Gi' | 'Gi + No Gi'>;
    declare start: Date;
    declare end: Date;
    declare description: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

EventEntry.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    {sequelize, underscored: true, timestamps: true, modelName: 'event_entry'}
)

export default EventEntry;
