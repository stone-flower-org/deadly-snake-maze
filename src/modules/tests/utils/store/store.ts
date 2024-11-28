import { Action, AnyAction, configureStore as baseConfigureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { memoizeFunc } from '@stone-flower-org/js-utils';
import merge from 'lodash/mergeWith';

import { defaultMiddlewareOverrides, rootReducer } from '@/src/modules/app/boot';
import { RootState } from '@/src/modules/app/utils/store/types';
import { SetupStoreOptions } from '@/src/modules/tests/types';

import { initialState } from './initial-state';

import type { RecursivePartial } from '@stone-flower-org/js-utils';

export const getInitialState = memoizeFunc(
  (): RootState => merge(merge({}, rootReducer(undefined, { type: '_fake' })), initialState),
);

export const overrideInitialState = (state: RecursivePartial<RootState>): RootState => merge(getInitialState(), state);

export const configureStore = <S = unknown, A extends Action = AnyAction>(params: ConfigureStoreOptions<S, A>) =>
  baseConfigureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareOverrides),
    ...params,
    preloadedState: (params.preloadedState ?? getInitialState()) as typeof params.preloadedState,
  });

export const setupStore = ({ preloadedState }: SetupStoreOptions = {}) =>
  configureStore({ reducer: rootReducer, preloadedState });
