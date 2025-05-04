import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import { postsReducer } from './posts/slice';
import { filterReducer } from './filters/slice';

const authConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user', 'isLoggedIn'],
};

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: persistReducer(authConfig, authReducer),
        filters: filterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});

export const persistor = persistStore(store);