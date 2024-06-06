import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  id: "", // user id
  userData: {}, // user data
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    auth: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state) => {
      return initialState;
    },
    setId: (state, action) => {
      state.id = action.payload;
      return state;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      return state;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      return state;
    },
  },
});
