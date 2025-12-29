import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";
class Group extends Model {
}
Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(64),
        allowNull: false,
    },
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: "groups",
    underscored: true,
    timestamps: true,
    sequelize,
});
export default Group;
