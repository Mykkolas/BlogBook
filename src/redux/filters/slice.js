import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "filters",
    initialState: {
        filter: "",
        themeFilter: ""
    },
    reducers: {
        changeFilter(state, action) {
            state.filter = action.payload
        },
        changeThemeFilter(state, action) {
            state.themeFilter = action.payload
        }
    }
})

export const { changeFilter, changeThemeFilter } = slice.actions
export const filterReducer = slice.reducer