import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";

const userSlice = createSlice({
  name: "user",
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
    const response = await loginService.login({
      username,
      password,
    });
    const loggedUser = {
      token: response.token,
      id: response.id,
      roles: response.roles,
      username: response.username,
      group: response.group,
    };
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    const { token, ...userForStore } = response;
    dispatch(setUser(userForStore));
    return userForStore;
  };
};
export default userSlice.reducer;
