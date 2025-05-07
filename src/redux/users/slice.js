import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./operations";

const slice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
    }
})


export const usersReducer = slice.reducer