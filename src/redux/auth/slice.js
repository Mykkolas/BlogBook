import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout, userRegister, userUploadAvatar } from "./operations";

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: null,
            email: null,
            id: null,
            avatar: null
        },
        token: null,
        isLoggedIn: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.fulfilled, (state, action) => {
                state.user = {
                    name: action.payload.name,
                    email: action.payload.email,
                    id: action.payload.id,
                    avatar: action.payload.avatar //
                }
                state.token = 'primeagen'
                state.isLoggedIn = true
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = {
                    name: action.payload.name,
                    email: action.payload.email,
                    id: action.payload.id,
                    avatar: action.payload.avatar
                }
                state.isLoggedIn = true
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.user = { name: null, email: null, id: null, avatar: null };
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(userUploadAvatar.fulfilled, (state, action) => {
                state.user.avatar = action.payload.avatar
            })
    },
});

export const authReducer = slice.reducer