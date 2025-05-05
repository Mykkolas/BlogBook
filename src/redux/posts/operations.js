import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault } from "../auth/operations";

export const fetchPosts = createAsyncThunk(
    "posts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await axiosDefault.get('/posts')
            return res.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const addPost = createAsyncThunk(
    "posts/addPost",
    async (post, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const authorName = state.auth.user.name
            const authorAvatar = state.auth.user.avatar
            const authorId = state.auth.user.id
            const fullPostData = {
                ...post,
                authorName,
                authorAvatar,
                authorId
            }
            const res = await axiosDefault.post('/posts', fullPostData)
            return res.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)


export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId, thunkAPI) => {
        try {
            const res = await axiosDefault.delete(`/posts/${postId}`)
            return res.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (post, thunkAPI) => {
        try {
            const res = await axiosDefault.put(`/posts/${post.id}`, post)
            return res.data
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const userUpdatePostsInfo = createAsyncThunk(
    "posts/updatePostsInfo",
    async ({ userId, avatar, userName }, thunkAPI) => {
        try {
            const res = await axiosDefault.get('/posts');
            const userPosts = res.data.filter(post => post.authorId === userId);

            //updating posts one-by-one, sequentially (to avoid parallel race issues)
            for (const post of userPosts) {
                const updatedPost = {
                    ...post,
                    authorName: userName,
                    authorAvatar: avatar
                };
                await axiosDefault.put(`/posts/${post.id}`, updatedPost);
            }

            //waiting 100ms, giving time for backend
            await new Promise(resolve => setTimeout(resolve, 100));

            //refetching posts
            const finalRes = await axiosDefault.get('/posts');
            return finalRes.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);


