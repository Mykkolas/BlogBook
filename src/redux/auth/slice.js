import { createSlice } from "@reduxjs/toolkit";
import { userDelete, userLogin, userLogout, userRegister, userUpdateProfile, userUploadAvatar } from "./operations";

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
            .addCase(userDelete.fulfilled, (state) => {
                state.user = { name: null, email: null, id: null, avatar: null };
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(userUploadAvatar.fulfilled, (state, action) => {
                state.user.avatar = action.payload.avatar
            })
            .addCase(userUpdateProfile.fulfilled, (state, action) => {
                state.user.name = action.payload.name
                state.user.email = action.payload.email
                /* console.log(action.payload); */ // full user object
            })
    },
});

export const authReducer = slice.reducer