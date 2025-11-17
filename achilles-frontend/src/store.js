import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "./reducers/usersReducer.js";
import userReducer from "./reducers/userReducer.js";
import achievementsReducer from "./reducers/achievementsReducer.js";


const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        achievements: achievementsReducer
    }
});

export default store;