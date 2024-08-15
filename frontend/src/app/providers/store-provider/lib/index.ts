'use client';

import { type Action, type ThunkAction } from '@reduxjs/toolkit';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
    type TypedUseSelectorHook,
} from 'react-redux';
import { ReduxState, store } from '..';

export const useAppDispatch = (): any => useReduxDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxDispatch = typeof store.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action
>;
