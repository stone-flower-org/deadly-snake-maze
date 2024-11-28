import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ServiceProvider } from '@stone-flower-org/js-app';

import * as appReducer from '@/src/modules/app/utils/store';

export const rootReducer = combineReducers({ ...appReducer });

export const defaultMiddlewareOverrides = {
  serializableCheck: {
    ignoredPaths: ['app.errors'],
    ignoreActions: true,
  },
};

export const storeProvider = ServiceProvider.createFromFunc(() =>
  configureStore({
    devTools: process.env.DEV_MODE === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareOverrides),
    reducer: rootReducer,
  }),
);
