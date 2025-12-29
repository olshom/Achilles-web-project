import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db";
class Role extends Model {
}
Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(64),
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: "roles",
    sequelize,
    underscored: true,
    timestamps: true,
});
export default Role;
