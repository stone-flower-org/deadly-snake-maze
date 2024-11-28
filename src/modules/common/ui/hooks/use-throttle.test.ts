import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHook } from '@/src/modules/tests/utils';

import { useThrottle } from './use-throttle';

type UseThrottleParams = Parameters<typeof useThrottle>;

const renderUseThrottle = (renderProps: RenderHookOptions<UseThrottleParams> = {}) =>
  renderHook(
    (initialProps: UseThrottleParams) => useThrottle(initialProps[0], initialProps[1], initialProps[2]),
    renderProps,
  );

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should not call given callback at most 1 time during given interval', async () => {
    const delay = 200;
    const args = {};
    const callback = vi.fn();
    const composition = renderUseThrottle({
      initialProps: [callback, [], delay],
    });

    composition.result.current(args);
    composition.result.current(args);
    vi.advanceTimersByTime(delay - 1);

    composition.result.current(args);
    composition.result.current(args);
    vi.advanceTimersByTime(delay - 1);

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });
});
