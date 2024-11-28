import { waitFor, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { RenderHookOptions } from '@/src/modules/tests/types';

import { useRefs } from './use-refs';

type UseRefsParams = Parameters<typeof useRefs>;

const renderUseRefs = (renderProps: RenderHookOptions<UseRefsParams> = {}) =>
  renderHook((initialProps: UseRefsParams = []) => useRefs(...initialProps), renderProps);

describe('useRefs', () => {
  it('should call forwardedRef with el after ref call', async () => {
    const args = {};
    const forwardedRef = vi.fn();
    const composition = renderUseRefs({
      initialProps: [forwardedRef],
    });
    composition.result.current.ref(args);
    await waitFor(() => {
      expect(forwardedRef).toHaveBeenCalledWith(args);
    });
  });
});
