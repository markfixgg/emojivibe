import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import { optionsReducer } from "./features/options/options.slice";
import { emojiReducer } from "./features/emoji/emoji.slice";

import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    options: optionsReducer,
    emoji: emojiReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})
