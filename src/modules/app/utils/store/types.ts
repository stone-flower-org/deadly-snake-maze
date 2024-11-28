import { TypedUseSelectorHook } from 'react-redux';

import { rootReducer, storeProvider } from '@/src/modules/app/boot';

export type RootStore = ReturnType<typeof storeProvider.get>;

export type RootState = ReturnType<typeof rootReducer>;

export type Dispatch = RootStore['dispatch'];

export type DispatchFunc = () => Dispatch;

export type SelectorFunc = TypedUseSelectorHook<RootState>;

export type SliceSelectorFunc<K extends keyof RootState, S> = (state: RootState[K]) => S;
