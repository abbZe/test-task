import { IGlobalInitState } from '.';
import { ReduxState } from '../../../../app/providers/store-provider';

export const selectGlobalSlice = (state: ReduxState): IGlobalInitState => state.globalSlice;
