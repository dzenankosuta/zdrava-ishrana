import { createSlice } from '@reduxjs/toolkit';

export const langSlice = createSlice({
  name: 'lang',
  initialState: {},
  reducers: {
    setLang: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
