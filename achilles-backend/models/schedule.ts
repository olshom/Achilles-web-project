import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import { sequelize } from "../util/db";
import Group from "./group";

//it will be a schedule template for event entries
class Schedule extends Model<
  InferAttributes<Schedule>,
  InferCreationAttributes<Schedule>
> {
  declare id: CreationOptional<number>;
  declare monday: boolean;
  declare tuesday: boolean;
  declare wednesday: boolean;
  declare thursday: boolean;
  declare friday: boolean;
  declare saturday: boolean;
  declare sunday: boolean;
  declare start: Date;
  declare end: Date;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare setGroupsForEvent: BelongsToManySetAssociationsMixin<Group, number>;
  declare getGroupsForEvent: () => Promise<Group[]>;
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    monday: DataTypes.BOOLEAN,
    tuesday: DataTypes.BOOLEAN,
    wednesday: DataTypes.BOOLEAN,
    thursday: DataTypes.BOOLEAN,
    friday: DataTypes.BOOLEAN,
    saturday: DataTypes.BOOLEAN,
    sunday: DataTypes.BOOLEAN,
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, underscored: true, timestamps: true, modelName: "schedule" },
);

export default Schedule;
