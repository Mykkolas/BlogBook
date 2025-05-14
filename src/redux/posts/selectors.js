import { createSelector } from 'reselect' // to avoid rerenders
import { selectPostsFilter, selectThemeFilter } from '../filters/selectors'

export const selectPosts = (state) => state.posts.posts
export const selectUserID = (state) => state.auth.user.id
export const selectUserPosts = createSelector(
    [selectPosts, selectUserID],
    (posts, id) => posts.filter(post => post.authorId === id)
)
export const selectFilteredUserPosts = createSelector(
    [selectUserPosts, selectPostsFilter, selectThemeFilter],
    (posts, filter, themeFilter) => {
        const filteredByTheme = themeFilter
            ? posts.filter(post => post.theme === themeFilter)
            : posts;

        const filteredByText = filteredByTheme.filter(post => {
            const matchesFilter =
                !filter ||
                post.title.toLowerCase().includes(filter.toLowerCase()) ||
                post.body.toLowerCase().includes(filter.toLowerCase()) ||
                post.authorName.toLowerCase().includes(filter.toLowerCase());
            return matchesFilter;
        });

        return filteredByText.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA; // newest first
        });
    }
);

export const selectLoading = (state) => state.posts.loading
export const selectError = (state) => state.posts.error
export const selectFilteredPosts = createSelector(
    [selectPosts, selectPostsFilter, selectThemeFilter],
    (posts, filter, themeFilter) => {
        const filteredByTheme = themeFilter
            ? posts.filter(post => post.theme === themeFilter)
            : posts;

        const filteredByText = filteredByTheme.filter(post => {
            const matchesFilter =
                !filter ||
                post.title.toLowerCase().includes(filter.toLowerCase()) ||
                post.body.toLowerCase().includes(filter.toLowerCase()) ||
                post.authorName.toLowerCase().includes(filter.toLowerCase());
            return matchesFilter;
        });

        return filteredByText.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA; // newest posts first
        });
    }
);



