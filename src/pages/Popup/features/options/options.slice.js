import { createSlice } from '@reduxjs/toolkit'
import locales from "../../../../assets/locales";

const initialState = {
    autoCopy: true,
    autoInsert: false,
    iconSize: 24,
    recent: [],
    numberOfRecent: 10,
    language: 'en'
}

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        addToRecent: (state, action) => {
            if(state.numberOfRecent === 0 || !action.payload) return;

            const inside = state.recent.findIndex(predicate => predicate.code_points.base === action.payload.code_points.base);

            if(inside >= 0) {
                state.recent.splice(inside, 1)

                state.recent.unshift(action.payload)

                return;
            }

            if(state.recent.length >= state.numberOfRecent) {
              state.recent.pop()

              state.recent.unshift(action.payload)
            } else {
              state.recent.push(action.payload)
            }
        },
        changeLanguage: (state, action) => {
            if(!['en','de', 'es', 'fr', 'pt', 'uk', 'ru'].includes(action.payload)) return;

            locales.setLanguage(action.payload)

            state.language = action.payload
        },
        changeAutoCopy: (state, action) => {
            state.autoCopy = action.payload
        },
        changeAutoInsert: (state, action) => {
            state.autoInsert = action.payload
        },
        changeNumberOfRecent: (state, action) => {
            if(![0, 10, 20, 30, 40, 50].includes(action.payload)) return

            if(state.recent.length > action.payload) state.recent.length = action.payload;

            state.numberOfRecent = action.payload
        },
        changeIconSize: (state, action) => {
            if(![24, 32, 40].includes(action.payload)) return

            state.iconSize = action.payload
        }
    },
})

export const { changeLanguage, changeNumberOfRecent, changeAutoInsert, changeIconSize, changeAutoCopy, addToRecent } = optionsSlice.actions

export const optionsReducer = optionsSlice.reducer