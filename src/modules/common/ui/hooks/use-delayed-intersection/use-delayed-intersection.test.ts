import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { RenderHookOptions } from '@/src/modules/tests/types';
import { renderHook } from '@/src/modules/tests/utils';

import { UseDelayedIntersectionParams } from './types';
import { useDelayedIntersection } from './use-delayed-intersection';

const renderUseDelayedIntersection = (renderProps: RenderHookOptions<UseDelayedIntersectionParams> = {}) =>
  renderHook((initialProps: UseDelayedIntersectionParams = {}) => useDelayedIntersection(initialProps), renderProps);

describe('useDelayedIntersection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call onEnter callback after specified delay when enter called and no leave occurs', async () => {
    const args = {};
    const callback = vi.fn();
    const delay = 200;
    const composition = renderUseDelayedIntersection({
      initialProps: {
        enterDelay: delay,
        onEnter: callback,
      },
    });

    composition.result.current.enter(args);
    vi.advanceTimersByTime(delay + 1);

    await waitFor(() => {
      expect(composition.result.current.intersectedRef.current).toBeTruthy();
      expect(callback).toHaveBeenCalledWith(args);
    });
  });

  it('should not call onEnter callback before specified delay when enter called and no leave occurs', async () => {
    const args = {};
    const callback = vi.fn();
    const delay = 200;
    const composition = renderUseDelayedIntersection({
      initialProps: {
        enterDelay: delay,
        onEnter: callback,
      },
    });

    composition.result.current.enter(args);
    vi.advanceTimersByTime(delay - 1);

    await waitFor(() => {
      expect(composition.result.current.intersectedRef.current).toBeTruthy();
      expect(callback).not.toHaveBeenCalled();
    });
  });

  it('should not call onEnter callback after specified delay when enter called and leave occurs', async () => {
    const args = {};
    const callback = vi.fn();
    const delay = 200;
    const composition = renderUseDelayedIntersection({
      initialProps: {
        enterDelay: delay,
        onEnter: callback,
      },
    });

    composition.result.current.enter(args);
    composition.result.current.leave(args);
    vi.advanceTimersByTime(delay + 1);

    await waitFor(() => {
      expect(composition.result.current.intersectedRef.current).toBeFalsy();
      expect(callback).not.toHaveBeenCalled();
    });
  });

  it('should call onLeave callback after specified delay when leave called and no enter occurs', async () => {
    const args = {};
    const callback = vi.fn();
    const delay = 200;
    const composition = renderUseDelayedIntersection({
      initialProps: {
        initIntersected: true,
        leaveDelay: delay,
        onLeave: callback,
      },
    });

    composition.result.current.leave(args);
    vi.advanceTimersByTime(delay + 1);

    await waitFor(() => {
      expect(composition.result.current.intersectedRef.current).toBeFalsy();
      expect(callback).toHaveBeenCalledWith(args);
    });
  });

  it('should not call onLeave callback before specified delay when leave called and no enter occurs', async () => {
    const args = {};
    const callback = vi.fn();
    const delay = 200;
    const composition = renderUseDelayedIntersection({
      initialProps: {
        initIntersected: true,
        leaveDelay: delay,
        onLeave: callback,
      },
    });

    composition.result.current.leave(args);
    vi.advanceTimersByTime(delay - 1);

    await waitFor(() => {
      expect(composition.result.current.intersectedRef.current).toBeFalsy();
      expect(callback).not.toHaveBeenCalled();
    });
  });

  it('should not call onLeave callback after specified delay when leave called and enter occurs', async () => {
    const args = {};
    const callback = vi.fn();
    const delay = 200;
    const composition = renderUseDelayedIntersection({
      initialProps: {
        initIntersected: true,
        leaveDelay: delay,
        onLeave: callback,
      },
    });

    composition.result.current.leave(args);
    composition.result.current.enter(args);
    vi.advanceTimersByTime(delay + 1);

    await waitFor(() => {
      expect(composition.result.current.intersectedRef.current).toBeTruthy();
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
