import { RootState } from '@/src/modules/app/utils/store/types';
import { AppProviderProps } from '@/src/modules/tests/components';

import type { PreloadedState } from '@reduxjs/toolkit';
import type {
  RenderOptions as BaseRenderOptions,
  RenderHookOptions as BaseRenderHookOptions,
} from '@testing-library/react';

export interface RenderOptions extends Omit<BaseRenderOptions, 'queries'>, SetupStoreOptions, AppProviderProps {}

export interface RenderHookOptions<Props = unknown>
  extends Omit<BaseRenderHookOptions<Props>, 'queries'>,
    SetupStoreOptions,
    AppProviderProps {}

export interface SetupStoreOptions {
  preloadedState?: PreloadedState<RootState>;
}
