import {createSlice} from "@reduxjs/toolkit";

import plansService from "../services/plans.js";

const plansSlice = createSlice({
    name: "plans",
    initialState: [],
    reducers: {
        setAllPlans: (state, action) => {
            return action.payload;
        }
    }
})

export const {setAllPlans} = plansSlice.actions;

export const initializePlans = () => {
    return async dispatch => {
        const plans = await plansService.getAllPlans();
        dispatch(setAllPlans(plans));
    }
}

export default plansSlice.reducer;