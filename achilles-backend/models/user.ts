import {Model, DataTypes, HasManyCreateAssociationMixin, BelongsToManySetAssociationsMixin,} from 'sequelize';
import {sequelize} from '../util/db';
import {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,

} from 'sequelize';
import Group from "./group";
import Plan from "./plan";
import Role from "./role";
import Achievement from "./achievement";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare firstName: string;
    declare lastName: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare groupId: ForeignKey<Group['id']>;
    declare group?: NonAttribute<Group>;
    declare belt: CreationOptional<string>;
    declare planId: ForeignKey<Plan['id']> | null;
    declare plan?: NonAttribute<Plan>;
    declare profilePic: CreationOptional<string>;
    declare roles?: NonAttribute<Role[]>;
    declare achievements?: NonAttribute<Achievement[]>;
    declare createAchievement: HasManyCreateAssociationMixin<Achievement, 'userId'>;

    declare setRoles: BelongsToManySetAssociationsMixin<Role, number>;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePic: {
        type: DataTypes.STRING,
    },
    belt: {
        type: DataTypes.STRING,
        defaultValue: 'white'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'users'
});

export default User;