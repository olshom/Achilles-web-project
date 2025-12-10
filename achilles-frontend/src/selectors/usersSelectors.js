import {createSelector} from "@reduxjs/toolkit";

const selectUsers = (state) => state.users;

export const selectUsersByRole = (role) =>
    createSelector([selectUsers], (users) =>
        users.filter((user) => user.roles.some(r => r.name === role))
    );