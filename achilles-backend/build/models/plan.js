import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";
class Plan extends Model {
}
Plan.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: new DataTypes.STRING(64),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: "plans",
    sequelize,
    underscored: true,
    timestamps: true,
});
export default Plan;
