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


/* export const userUpdatePosts = createAsyncThunk(
    'posts/updateUserPosts',
    async ({ id, name }, thunkAPI) => {
        try {
            const res = await axiosDefault.get('/posts');
            console.log(res.data);
            const userPosts = res.data.filter(post => post.authorId === id);

            const updatedPosts = await Promise.all(
                userPosts.map(async post => {
                    const updatedPost = {
                        ...post,
                        authorName: name,
                    };
                    await axiosDefault.put(`/posts/${post.id}`, updatedPost);
                    return updatedPost;
                })
            );
            console.log(updatedPosts);
            return updatedPosts;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const userUpdatePostAvatar = createAsyncThunk(
    'posts/updateUserPostsAvatar',
    async ({ id, avatar }, thunkAPI) => {
        try {
            const res = await axiosDefault.get('/posts')
            const userPosts = res.data.filter(post => post.authorId === id)

            const updates = userPosts.map(post =>
                axiosDefault.put(`/posts/${post.id}`, {
                    ...post,
                    authorAvatar: avatar,
                })
            );

            const responses = await Promise.all(updates);
            return responses.map(res => res.data)
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
) */