import throttle from 'lodash/throttle';
import { useEffect, useMemo } from 'react';

export const useThrottle = <P extends unknown[], R>(func: (...args: P) => R, deps: unknown[], wait = 100) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useMemo(() => throttle(func, wait), deps);
  useEffect(
    () => () => {
      debounced.cancel();
    },
    [debounced],
  );
  return debounced;
};
