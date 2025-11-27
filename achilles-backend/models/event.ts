import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    HasManyAddAssociationsMixin, BelongsToManySetAssociationsMixin, ForeignKey, HasManyCreateAssociationMixin,
} from 'sequelize';
import { sequelize } from '../util/db';
import Group from "./group";
import User from "./user";
import EventEntry from "./eventEntry";

class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare isRecurring: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare addGroups: HasManyAddAssociationsMixin<Group, number>;
    declare coach: CreationOptional<ForeignKey<User['id']> | null>;
//    declare coach?: NonAttribute<User>;
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
        coach: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
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