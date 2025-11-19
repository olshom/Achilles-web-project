import {createSlice} from "@reduxjs/toolkit";
import rolesService from "../services/roles.js";

const rolesSlice = createSlice({
    name: "roles",
    initialState: [],
    reducers: {
        setAllRoles: (state, action) => {
            return action.payload;
        }
    }
})

export const {setAllRoles} = rolesSlice.actions;

export const initializeRoles = () => {
    return async (dispatch) => {
        const roles = await rolesService.getAllRoles();
        dispatch(setAllRoles(roles));
    }
}

export default rolesSlice.reducer;