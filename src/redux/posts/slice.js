import { createSlice } from "@reduxjs/toolkit";
import {
    addPost,
    addReactionToPost,
    deletePost,
    fetchPosts,
    updatePost,
    userUpdatePostsInfo
} from "./operations";
import { userDelete } from "../auth/operations";

const slice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch posts";
            })

            .addCase(addPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                state.theme = action.payload.theme;
                state.loading = false;
                state.error = null;
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add post";
            })

            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete post";
            })

            .addCase(updatePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update post";
            })

            .addCase(userUpdatePostsInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(userUpdatePostsInfo.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(userUpdatePostsInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update user's posts";
            })

            .addCase(userDelete.fulfilled, (state, action) => {
                const deletedUserId = action.payload.userId;
                state.posts = state.posts.filter(post => post.authorId !== deletedUserId);
            })

            .addCase(addReactionToPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReactionToPost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(addReactionToPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add reaction";
            });
    }
});

export const postsReducer = slice.reducer;
