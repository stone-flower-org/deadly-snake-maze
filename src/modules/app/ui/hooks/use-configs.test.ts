import { renderHook } from '@testing-library/react';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHookWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { useConfigs } from './use-configs';

const renderUseConfigsWithProviders = (renderProps: RenderHookOptions = {}) =>
  renderHookWithProviders(() => useConfigs(), renderProps);

const renderUseConfigs = (renderProps: RenderHookOptions = {}) => renderHook(() => useConfigs(), renderProps);

beforeAll(async () => {
  await setupAndBootApp();
});

describe('useConfigs', () => {
  it('should return configs when using whithin ConfigsContext', () => {
    const composition = renderUseConfigsWithProviders();
    expect(composition.result.current.APP_TZ).toBe('UTC');
  });

  it('throw exception when using beyound ConfigsContext', () => {
    expect(() => {
      renderUseConfigs();
    }).toThrow('useConfigs must be used within ConfigsContext');
  });
});
