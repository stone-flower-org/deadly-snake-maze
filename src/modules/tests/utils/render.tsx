import { Progress } from '@stone-flower-org/js-utils';
import type {
  RenderHookOptions as BaseRenderHookOptions,
  RenderOptions as BaseRenderOptions,
} from '@testing-library/react';
import { render as baseRender, renderHook as baseRenderHook } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';

import { AppProvider, AppProviderProps } from '@/src/modules/tests/components';
import { RenderHookOptions, RenderOptions } from '@/src/modules/tests/types';

import { createMemoryHistory } from './history';
import { queries } from './queries';

const makeRendererWrapper = (props: AppProviderProps) =>
  function wrapper({ children }: { children?: ReactNode }) {
    return <AppProvider {...props}>{children}</AppProvider>;
  };

export const render = (el: ReactElement, options?: BaseRenderOptions) =>
  baseRender(el, {
    ...options,
    queries,
  });

export const renderHook = <Result = unknown, Props = unknown>(
  render: (initialProps: Props) => Result,
  options: Partial<BaseRenderHookOptions<Props>> = {},
) =>
  baseRenderHook<Result, Props>(render, {
    ...options,
    queries,
  });

export const renderWithProviders = (
  el: ReactElement,
  { bootProgress = Progress.create(), history = createMemoryHistory(), ...renderOptions }: RenderOptions = {},
) => ({
  bootProgress,
  history,
  ...render(el, {
    wrapper: makeRendererWrapper({
      bootProgress,
      history,
    }),
    ...renderOptions,
  }),
});

export const renderHookWithProviders = <Result = unknown, Props = unknown>(
  render: (initialProps: Props) => Result,
  {
    bootProgress = Progress.create(),
    history = createMemoryHistory(),
    ...renderOptions
  }: RenderHookOptions<Props> = {},
) => ({
  bootProgress,
  history,
  ...renderHook(render, {
    wrapper: makeRendererWrapper({
      bootProgress,
      history,
    }),
    ...renderOptions,
  }),
});
