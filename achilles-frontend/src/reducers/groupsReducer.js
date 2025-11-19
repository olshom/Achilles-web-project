import {createSlice} from "@reduxjs/toolkit";
import groupsService from "../services/groups.js";

const groupsSlice = createSlice({
    name: "groups",
    initialState: [],
    reducers: {
        setAllGroups: (state, action) => {
            return action.payload;
        }
    }
})

export const {setAllGroups} = groupsSlice.actions;

export const initializeGroups = () => {
    return async dispatch => {
        const groups = await groupsService.getAllGroups();
        dispatch(setAllGroups(groups));
    }
}

export default groupsSlice.reducer;