import { debounce } from '@mui/material';
import { useEffect, useMemo } from 'react';

export const useDebounce = <P extends unknown[]>(func: (...args: P) => unknown, deps: unknown[], wait = 500) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useMemo(() => debounce(func, wait), deps);
  useEffect(
    () => () => {
      debounced.clear();
    },
    [debounced],
  );
  return debounced;
};
