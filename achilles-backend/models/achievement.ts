import {
    Model,
    DataTypes,
    NonAttribute,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';
import {sequelize} from '../util/db';
import User from "./user";

class Achievement extends Model<InferAttributes<Achievement>, InferCreationAttributes<Achievement>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare user?: NonAttribute<User>;
    declare date: string;
    declare type: string;
    declare description: string;

}

Achievement.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    }

}, {sequelize,
    underscored: true,
    modelName: "achievement",
    timestamps: false
});

export default Achievement;