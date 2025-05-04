import { createSlice } from "@reduxjs/toolkit";
import { addPost, deletePost, fetchPosts, updatePost } from "./operations";

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

    }
})

export const postsReducer = slice.reducer






/*   .addCase(userUpdatePosts.fulfilled, (state, action) => {
              const updatedPosts = action.payload;
             updatedPosts.forEach(updatedPost => {
                 const index = state.posts.findIndex(post => post.id === updatedPost.id);
                 if (index !== -1) {
                     state.posts[index] = updatedPost;
                 }
             }); 
        })
        .addCase(userUpdatePostAvatar.fulfilled, (state, action) => {
              state.posts = state.posts.map(post =>
                 post.authorId === action.payload.id
                     ? { ...post, authorAvatar: action.payload.avatar } // Update authorName
                     : post
             ); 
            const updatedPosts = action.payload;
            console.log(updatedPosts);
            updatedPosts.forEach(updatedPost => {
                const index = state.posts.findIndex(post => post.id === updatedPost.id);
                if (index !== -1) {
                    state.posts[index] = updatedPost;
                }
            });
        }) */
