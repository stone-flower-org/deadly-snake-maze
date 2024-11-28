import { createSelector, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/src/modules/app/utils/store/types';

import { SLICE_NAME } from './constants';
import { AppState } from './types';

export const selectErrors = createSelector(
  (state: RootState) => state[SLICE_NAME].errors,
  (errors) => errors,
);

export const initialState: AppState = {
  errors: [],
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<Error[]>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      action.error && state.errors.push(action.error as Error);
    });
  },
});

export const { setErrors } = slice.actions;

export default slice.reducer;
