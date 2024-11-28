import { ForwardedRef, useCallback } from 'react';

export const useRefs = <T>(...forwardedRefs: ForwardedRef<T>[]) => {
  const ref = useCallback((el: T | null) => {
    forwardedRefs.forEach((forwardedRef) => {
      if (forwardedRef)
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else forwardedRef.current = el;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ref,
  };
};
