import throttle from 'lodash/throttle';
import { useEffect, useMemo } from 'react';

export const useThrottle = <P extends unknown[], R>(func: (...args: P) => R, deps: unknown[], wait = 100) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: get deps from arguments directly
  const debounced = useMemo(() => throttle(func, wait), deps);
  useEffect(
    () => () => {
      debounced.cancel();
    },
    [debounced],
  );
  return debounced;
};
