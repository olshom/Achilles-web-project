import {createSlice} from "@reduxjs/toolkit";
import usersService from "../services/users.js";


const usersSlice = createSlice ({
    name : 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        updateUser(state, action) {
            const updUser = action.payload;
            return state.map(user=> user.id === updUser.id ? updUser : user);
        },
        deleteUser(state, action) {
            const deletedUserId = action.payload;
            return state.filter(user=> user.id !== deletedUserId );
        }
    }
})

export const {setUsers, updateUser, deleteUser} = usersSlice.actions;
export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await usersService.getAllUsers();
        dispatch(setUsers(users));
    }
}

export const deleteUserAction = (id) => {
    return async (dispatch) => {
        await usersService.deleteUser(id);
        dispatch(deleteUser(id));
    }
}

export default usersSlice.reducer;