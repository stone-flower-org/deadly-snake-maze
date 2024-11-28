import { createProgress } from '@stone-flower-org/js-utils';
import { renderHook } from '@testing-library/react';
import React from 'react';

import { AppBootProvider } from '@/src/modules/app/ui/context/AppBootProvider';
import { RenderHookOptions } from '@/src/modules/tests/types';
import { setupAndBootApp } from '@/src/modules/tests/utils';

import { useAppBoot } from './use-app-boot';

const renderUseAppBootWithProviders = (renderProps: RenderHookOptions = {}) =>
  renderHook(() => useAppBoot(), {
    wrapper: ({ children }) => <AppBootProvider progress={createProgress()}>{children}</AppBootProvider>,
    ...renderProps,
  });

const renderUseAppBoot = (renderProps: RenderHookOptions = {}) => renderHook(() => useAppBoot(), renderProps);

beforeAll(async () => {
  await setupAndBootApp();
});

describe('useAppBoot', () => {
  it('should return app boot progress when using whithin AppBootContext', () => {
    const composition = renderUseAppBootWithProviders();
    expect(composition.result.current.progress).toBeDefined();
  });

  it('throw exception when using beyound AppBootContext', () => {
    expect(() => {
      renderUseAppBoot();
    }).toThrow('useAppBoot must be used within AppBootContext');
  });
});
