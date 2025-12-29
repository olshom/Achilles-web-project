import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer.js";
import userReducer from "./reducers/userReducer.js";
import achievementsReducer from "./reducers/achievementsReducer.js";
import groupsReducer from "./reducers/groupsReducer.js";
import plansReducer from "./reducers/plansReducer.js";
import rolesReducer from "./reducers/rolesReducer.js";
import eventsReducer from "./reducers/eventsReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    achievements: achievementsReducer,
    groups: groupsReducer,
    plans: plansReducer,
    roles: rolesReducer,
    events: eventsReducer,
  },
});

export default store;
