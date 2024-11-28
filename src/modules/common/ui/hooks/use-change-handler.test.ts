import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHook } from '@/src/modules/tests/utils';

import { useChangeHandler, UseChangeHandlerParams } from './use-change-handler';

const defaultObject = {
  key0: 'some val 0',
  key1: 'some val 1',
};

const renderUseChangeHandler = (
  renderProps: RenderHookOptions<UseChangeHandlerParams<Record<string, string>, string>> = {},
) => renderHook((initialProps) => useChangeHandler(initialProps), renderProps);

describe('useChangeHandler', () => {
  it('should call onChange with updated object using new key value', async () => {
    const onChange = vi.fn();
    const newVal = 'Some New Val';
    const key = 'key1';
    const composition = renderUseChangeHandler({
      initialProps: {
        key,
        state: defaultObject,
        onChange,
      },
    });
    composition.result.current(newVal);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        ...defaultObject,
        [key]: newVal,
      });
    });
  });
});
