import Group from "./group";
import Plan from "./plan";
import Role from "./role";
import User from "./user";
import Achievement from "./achievement";
import Event from "./event";


Event.belongsToMany(Group, { through: 'event_groups', as: 'groups'});
Group.belongsToMany(Event, { through: 'event_groups', as: 'events'});

Group.hasMany(User, { as: 'users'});
User.belongsTo(Group, {as: 'group'});
Plan.hasMany(User, {as: 'users'});
User.belongsTo(Plan, {as: 'plan'});
User.hasMany(Achievement, {    sourceKey: 'id',
    foreignKey: 'userId', as: 'achievements' });
Achievement.belongsTo(User, {foreignKey: 'userId', as: 'user'});
User.belongsToMany(Role, {through: 'user_roles', as: 'roles'});
Role.belongsToMany(User, {through: 'user_roles', as: 'users'});

//Event.belongsToMany(Group, { through: 'EventGroups', as: 'groups', foreignKey: 'eventId' });
//Group.belongsToMany(Event, { through: 'EventGroups', as: 'events', foreignKey: 'groupId' });

export {User, Role, Achievement, Event, Plan, Group}