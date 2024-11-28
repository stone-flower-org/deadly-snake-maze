import { useEffect, useMemo, useRef } from 'react';

export const useTimeout = () => {
  const timeoutIdsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const timeout = useMemo(() => {
    const callback = (func: () => void, ms?: number) => {
      const timeoutId = setTimeout(() => {
        timeoutIdsRef.current.delete(timeoutId);
        func();
      }, ms);
      timeoutIdsRef.current.add(timeoutId);
      return timeoutId;
    };

    callback.clear = (timeoutId: ReturnType<typeof setTimeout>) => {
      clearTimeout(timeoutId);
      return timeoutIdsRef.current.delete(timeoutId);
    };

    return callback;
  }, []);

  useEffect(
    () => () => {
      timeoutIdsRef.current.forEach(clearTimeout);
    },
    [],
  );

  return timeout;
};
