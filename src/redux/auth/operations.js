import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosDefault = axios.create({
    baseURL: 'https://680fa54467c5abddd1961e0d.mockapi.io'
})

export const userRegister = createAsyncThunk(
    'auth/register',
    async (user, thunkApi) => {
        try {
            const res = await axiosDefault.post('/users', user)
            console.log(res.data)
            return res.data
        }
        catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async (credentials, thunkApi) => {
        try {
            const res = await axiosDefault.get('/users')
            const users = res.data
            const foundUser = users.find(user => user.email === credentials.email && user.password === credentials.password)
            if (!foundUser) {
                return thunkApi.rejectWithValue('Invalid email or password!')
            }
            const { name, email, id, avatar } = foundUser;
            return { name, email, id, avatar }; // avatar, but no password
        }
        catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const userLogout = createAsyncThunk(
    'auth/logout',
    async () => { // clearing redux state in slice
        return;
    }
);

export const userDelete = createAsyncThunk(
    '/auth/userDelete',
    async (userId, thunkAPI) => {
        try {
            await axiosDefault.delete(`/users/${userId}`);

            //getting my posts
            const postsRes = await axiosDefault.get('/posts');
            const userPosts = postsRes.data.filter(post => post.authorId === userId);

            await Promise.all(
                userPosts.map(post => axiosDefault.delete(`/posts/${post.id}`))
            );

            //return the deleted userId for post slice cleanup
            return { userId };
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);



export const userUploadAvatar = createAsyncThunk(
    'auth/avatarUpload',
    async ({ userId, avatar }, thunkAPI) => {
        try {
            const res = await axiosDefault.put(`/users/${userId}`, { avatar })
            const { name, email, id } = res.data;
            return { name, email, id, avatar };
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const userUpdateProfile = createAsyncThunk(
    'auth/profileUpdate',
    async ({ id, name, email }, thunkAPI) => {
        try {
            const res = await axiosDefault.put(`/users/${id}`, { name, email })
            return res.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
