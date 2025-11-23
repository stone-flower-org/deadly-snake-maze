import { debounce } from '@mui/material';
import { useEffect, useMemo } from 'react';

export const useDebounce = <P extends unknown[]>(func: (...args: P) => unknown, deps: unknown[], wait = 500) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: set dpes from arguments directly
  const debounced = useMemo(() => debounce(func, wait), deps);
  useEffect(
    () => () => {
      debounced.clear();
    },
    [debounced],
  );
  return debounced;
};
