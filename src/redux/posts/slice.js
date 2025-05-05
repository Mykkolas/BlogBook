import { createSlice } from "@reduxjs/toolkit";
import { addPost, addReactionToPost, deletePost, fetchPosts, updatePost, userUpdatePostsInfo } from "./operations";
import { userDelete } from "../auth/operations";

const slice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.error = null
                state.loading = null
                console.log(action.payload);

            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
                state.theme = action.payload.theme
                state.error = null
                state.loading = false
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload.id)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false
                const index = state.posts.findIndex(post => post.id === action.payload.id)
                if (index !== -1) {
                    state.posts[index] = action.payload
                }
            })
            .addCase(userUpdatePostsInfo.fulfilled, (state, action) => {
                state.posts = action.payload; // refetching all the posts, so can change all
            })
            .addCase(userDelete.fulfilled, (state, action) => {
                const deletedUserId = action.payload.userId;
                state.posts = state.posts.filter(post => post.authorId !== deletedUserId);
            })
            .addCase(addReactionToPost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }

            })


    }
})

export const postsReducer = slice.reducer






