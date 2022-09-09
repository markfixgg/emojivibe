import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tone: 1
}

export const emojiSlice = createSlice({
    name: 'emoji',
    initialState,
    reducers: {
        changeTone: (state, action) => {
            state.tone = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { changeTone, filter } = emojiSlice.actions

export const emojiReducer = emojiSlice.reducer