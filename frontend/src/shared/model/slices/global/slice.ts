import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { globalInitState } from '.';
import { Language } from '../..';

const globalSlice = createSlice({
    name: 'global',
    initialState: globalInitState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.currentLanguage = action.payload;
        },
    },
});

export default globalSlice.reducer;
export const { setLanguage } = globalSlice.actions;
