import { Model, DataTypes, } from "sequelize";
import { sequelize } from "../util/db";
import Plan from "./plan";
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePic: {
        type: DataTypes.STRING,
    },
    belt: {
        type: DataTypes.STRING,
        defaultValue: "white",
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Plan,
            key: "id",
        },
        defaultValue: 1,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "users",
});
export default User;
