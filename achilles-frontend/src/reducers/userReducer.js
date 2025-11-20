import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login.js';
import achievementService from '../services/achievements.js'


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },

    },
});

export const { setUser } = userSlice.actions;

export const loginAction = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username,
            password,
        });
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
        achievementService.setToken(user.token);
        dispatch(setUser(user));
        return user;
    };
};
export default userSlice.reducer;