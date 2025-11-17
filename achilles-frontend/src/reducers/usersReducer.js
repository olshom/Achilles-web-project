import {createSlice} from "@reduxjs/toolkit";
import usersService from "../services/users.js";


const usersSlice = createSlice ({
    name : 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
/*        createUser(state, action) {
            const newUser = action.payload;
            state.users.push(newUser);
        }*/
    }
})

export const {setUsers} = usersSlice.actions;
export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await usersService.getAllUsers();
        dispatch(setUsers(users));
    }
}
export default usersSlice.reducer;