import { useCallback, useRef } from 'react';

import { useTimeout } from '@/src/modules/common/ui/hooks/use-timeout';

import { DEFAULT_ENTER_DELAY, DEFAULT_LEAVE_DELAY } from './constants';
import { UseDelayedIntersectionParams } from './types';

export const useDelayedIntersection = <EP extends unknown[], LP extends unknown[]>({
  enterDelay = DEFAULT_ENTER_DELAY,
  initIntersected,
  leaveDelay = DEFAULT_LEAVE_DELAY,
  onEnter,
  onLeave,
}: UseDelayedIntersectionParams<EP, LP> = {}) => {
  const timeout = useTimeout();

  const intersectedRef = useRef(!!initIntersected);

  const leave = useCallback(
    function (...params: LP) {
      intersectedRef.current = false;
      timeout(() => {
        if (intersectedRef.current) return;
        onLeave && onLeave(...params);
      }, leaveDelay);
    },
    [timeout, leaveDelay, onLeave],
  );

  const enter = useCallback(
    function (...params: EP) {
      intersectedRef.current = true;
      timeout(() => {
        if (!intersectedRef.current) return;
        onEnter && onEnter(...params);
      }, enterDelay);
    },
    [timeout, enterDelay, onEnter],
  );

  return {
    enter,
    intersectedRef,
    leave,
  };
};
