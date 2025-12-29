import Group from "./group";
import Plan from "./plan";
import Role from "./role";
import User from "./user";
import Achievement from "./achievement";
import Schedule from "./schedule";
import Event from "./event";

Event.belongsToMany(Group, { through: "event_groups", as: "groups" });
Group.belongsToMany(Event, { through: "event_groups", as: "events" });

Group.hasMany(User, { as: "users" });
User.belongsTo(Group, { as: "group" });

Plan.hasMany(User, { as: "users" });
User.belongsTo(Plan, { as: "plan" });

User.hasMany(Achievement, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "achievements",
});
Achievement.belongsTo(User, { foreignKey: "userId", as: "user" });

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "user_id",
  as: "roles",
});
Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "role_id",
  as: "users",
});

Schedule.belongsToMany(Group, {
  through: "schedule_groups",
  as: "groupsForEvent",
  foreignKey: "schedule_id",
});
Group.belongsToMany(Schedule, {
  through: "schedule_groups",
  as: "schedules",
  foreignKey: "group_id",
});

Event.belongsTo(User, { foreignKey: "coachId", as: "coach" });
User.hasMany(Event, { sourceKey: "id", foreignKey: "coachId", as: "events" });

Schedule.hasMany(Event, { as: "events", foreignKey: "scheduleId" });
Event.belongsTo(Schedule, { as: "schedule", foreignKey: "scheduleId" });

export { User, Role, Achievement, Plan, Group, Event, Schedule };
