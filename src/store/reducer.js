import { combineReducers } from "@reduxjs/toolkit";
import { sideMenuSlice } from "./sideMenuSlice";
import { themeSlice } from "./themeSlice";
import { authSlice } from "./authSlice";
import { langSlice } from "./langSlice";
import { statsSlice } from "./statsSlice";

export const rootReducer = combineReducers({
  sideMenu: sideMenuSlice.reducer,
  theme: themeSlice.reducer,
  auth: authSlice.reducer,
  lang: langSlice.reducer,
  stats: statsSlice.reducer,
});
