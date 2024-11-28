import { useCallback, useRef } from 'react';

export interface UseChangeHandlerParams<S extends object, K extends keyof S> {
  key: K;
  state: S;
  onChange?: (state: S) => void;
}

export const useChangeHandler = <S extends object = object, K extends keyof S = keyof S, V = S[K]>({
  key,
  state,
  onChange,
}: UseChangeHandlerParams<S, K>) => {
  const stateRef = useRef(state);
  stateRef.current = state;
  return useCallback(
    (value: V) => {
      if (!onChange) return;
      const newObj = {
        ...stateRef.current,
        [key]: value,
      };
      onChange(newObj);
    },
    [onChange, key],
  );
};
