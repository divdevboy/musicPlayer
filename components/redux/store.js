import {combineReducers, configureStore} from "@reduxjs/toolkit";
import PlayerSlice from './PlayerSlice';

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
import storage from 'redux-persist/lib/storage'; // uses localStorage

const rootReducer = combineReducers({
    player: PlayerSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['player'] // only persist the 'player' slice
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // These action types are needed for redux-persist to work without warnings
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store);
