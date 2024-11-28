import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHook } from '@/src/modules/tests/utils';

import { useDebounce } from './use-debounce';

type UseDebounceParams = Parameters<typeof useDebounce>;

const renderUseDebounce = (renderProps: RenderHookOptions<UseDebounceParams> = {}) =>
  renderHook(
    (initialProps: UseDebounceParams) => useDebounce(initialProps[0], initialProps[1], initialProps[2]),
    renderProps,
  );

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should not call callback until given time pass', async () => {
    const args = {};
    const callback = vi.fn();
    const composition = renderUseDebounce({
      initialProps: [callback, []],
    });
    composition.result.current(args);
    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(0);
    });
  });

  it('should run last call after timer pass', async () => {
    const args0 = {};
    const args1 = {};
    const callback = vi.fn();
    const composition = renderUseDebounce({
      initialProps: [callback, []],
    });

    composition.result.current(args0);
    composition.result.current(args1);
    vi.runOnlyPendingTimers();

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(args1);
    });
  });
});
