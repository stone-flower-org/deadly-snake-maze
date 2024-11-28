import { waitFor } from '@testing-library/react';
import { useState } from 'react';
import { vi } from 'vitest';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHook } from '@/src/modules/tests/utils';

import { useControlledState, UseControlledStateParams } from './use-controlled-state';

const newState = { a: 'a' };
const firedEvent = {};
const defaultState = {};

const renderUseControlledState = (renderProps: RenderHookOptions<UseControlledStateParams<unknown, unknown>> = {}) =>
  renderHook(
    (initialProps: UseControlledStateParams<unknown, unknown>) => {
      const [state, setState] = useState(initialProps.state);
      const hook = useControlledState({
        ...initialProps,
        state,
      });
      return {
        outerState: state,
        outerUpdateState: setState,
        hook,
      };
    },
    {
      ...renderProps,
      initialProps: {
        state: defaultState,
        ...renderProps.initialProps,
      },
    },
  );

describe('useControlledState', () => {
  it('should return passed initial state', () => {
    const composition = renderUseControlledState();
    expect(composition.result.current.hook.state).toBe(defaultState);
  });

  it('should return new passed outer state', async () => {
    const composition = renderUseControlledState();
    await waitFor(() => {
      composition.result.current.outerUpdateState(newState);
    });
    await waitFor(() => {
      expect(composition.result.current.hook.state).toBe(newState);
    });
  });

  it('should return new state when onChange undefined after updateState call', async () => {
    const composition = renderUseControlledState();
    await waitFor(() => {
      composition.result.current.hook.updateState(newState);
    });
    await waitFor(() => {
      expect(composition.result.current.hook.state).toBe(newState);
    });
  });

  it('should keep prev state and call onChange with new state when onChange given after updateState call', async () => {
    const onChange = vi.fn();
    const composition = renderUseControlledState({
      initialProps: {
        state: defaultState,
        onChange,
      },
    });
    await waitFor(() => {
      composition.result.current.hook.updateState(newState, firedEvent);
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(newState, firedEvent);
      expect(composition.result.current.hook.state).toBe(defaultState);
    });
  });
});
