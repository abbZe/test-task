import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '../../../../shared/model/slices/global/slice';

export const store = configureStore({
    reducer: {
        globalSlice,
    },
});

export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
