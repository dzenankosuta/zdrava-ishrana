import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  id: "", // user id
  firstName: "",
  lastName: "",
  email: "",
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
    setEmail: (state, action) => {
      state.email = action.payload;
      return state;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
      return state;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
      return state;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      return state;
    },
  },
});
