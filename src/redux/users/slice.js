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
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add reaction";
            });
    }
})


export const usersReducer = slice.reducer