import { createSlice } from "@reduxjs/toolkit";

const themes = {
  theme1: {
    dark: false,
    colors: {
      primary: "#2d6255",
      background: "#e7def2",
      background2: "#ffffff",
      background3: "#b0b1ab",
      infoBackground: "#eaeaf5",
      card: "#a8a7a7",
      text: "#3e3e3e",
      border: "#a0a0a0",
      darkBorder: "#808080",
      notification: "rgb(255, 69, 58)",
      link: "#f0f1b9",
      placeholder: "#a8a7a7",
      safe: "#06911d",
      medium: "#ff9100",
      dangerous: "#f90d0d",
    },
  },
  theme2: {
    dark: true,
    colors: {
      primary: "#2d6255",
      background: "#e7def2",
      background2: "#ffffff",
      background3: "#b0b1ab",
      infoBackground: "#eaeaf5",
      card: "#a8a7a7",
      text: "#3e3e3e",
      border: "#a0a0a0",
      darkBorder: "#808080",
      notification: "rgb(255, 69, 58)",
      link: "#f0f1b9",
      placeholder: "#a8a7a7",
      safe: "#06911d",
      medium: "#ff9100",
      dangerous: "#f90d0d",
    },
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    selectedTheme: themes.theme1,
  },
  reducers: {
    setTheme: (state, action) => {
      const { theme } = action.payload; // theme = 'light' or 'dark'
      state.selectedTheme = themes[theme];
      return state;
    },
  },
});
