import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sideMenu: false,
};

export const sideMenuSlice = createSlice({
    name: 'sideMenu',
    initialState: initialState,
    reducers: {
        toggleSideMenu: (state) => {
            state.sideMenu = !state.sideMenu;
            return state;
        },
        setSideMenu: (state, action) => {
            const { isOpen } = action.payload;
            state.sideMenu = isOpen;
            return state;
        },
    },
});
