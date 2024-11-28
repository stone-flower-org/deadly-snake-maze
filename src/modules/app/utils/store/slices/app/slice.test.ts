import { createAsyncThunk } from '@reduxjs/toolkit';

import { getInitialState, overrideInitialState } from '@/src/modules/tests/utils';

import { SLICE_NAME } from './constants';
import reducer, { selectErrors, setErrors } from './slice';

describe('selectErrors', () => {
  it('should return stored errors', () => {
    const data = [new Error()];
    const state = overrideInitialState({
      [SLICE_NAME]: {
        errors: data,
      },
    });
    expect(selectErrors(state)).toStrictEqual(data);
  });
});

describe('setErrors', () => {
  it('should store provided errors', () => {
    const data = [new Error()];
    expect(reducer(getInitialState()[SLICE_NAME], setErrors(data))).toEqual({
      errors: data,
    });
  });
});

describe('isRejected', () => {
  it('should store error from rejected action', () => {
    const error = new Error();
    const asyncAction = createAsyncThunk(`${SLICE_NAME}/action`, () => undefined);
    const action = {
      ...asyncAction.rejected,
      meta: {
        requestId: '1',
        requestStatus: 1,
      },
      error,
    };
    expect(reducer(getInitialState()[SLICE_NAME], action)).toEqual({
      errors: [error],
    });
  });
});
