import { Model, DataTypes, } from "sequelize";
import { sequelize } from "../util/db";
class Achievement extends Model {
}
Achievement.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: "achievement",
    underscored: true,
    timestamps: true,
});
export default Achievement;
