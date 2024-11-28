import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHook } from '@/src/modules/tests/utils';

import { useTimeout } from './use-timeout';

const defaultDelay = 500;

const renderUseTimeout = (renderProps: RenderHookOptions = {}) => renderHook(() => useTimeout(), renderProps);

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should call given function after given delay', async () => {
    const func = vi.fn();
    const timeout = renderUseTimeout().result.current;
    timeout(func, defaultDelay);
    vi.runOnlyPendingTimers();
    await waitFor(() => {
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  it('should remove delayed function from stack after clear call', async () => {
    const firstFunc = vi.fn();
    const secondFunc = vi.fn();
    const timeout = renderUseTimeout().result.current;

    const timeoutId = timeout(firstFunc, defaultDelay);
    timeout(secondFunc, defaultDelay);
    timeout.clear(timeoutId);

    vi.runOnlyPendingTimers();
    await waitFor(() => {
      expect(firstFunc).not.toHaveBeenCalled();
      expect(secondFunc).toHaveBeenCalledTimes(1);
    });
  });
});
