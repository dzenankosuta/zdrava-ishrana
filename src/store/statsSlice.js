import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logStatistics: false,
  deviceId: "",
};

export const statsSlice = createSlice({
  name: "stats",
  initialState: initialState,
  reducers: {
    setLogStatistics: (state, action) => {
      state.logStatistics = action.payload;
      return state;
    },
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
      return state;
    },
  },
});
