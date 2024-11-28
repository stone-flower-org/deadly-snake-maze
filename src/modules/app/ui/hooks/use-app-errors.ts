import { bindActionCreators } from '@reduxjs/toolkit';
import { useCallback, useMemo, useRef } from 'react';

import { selectErrors, setErrors as setErrorsAction } from '@/src/modules/app/utils/store/slices/app';

import { useDispatch } from './use-dispatch';
import { useSelector } from './use-selector';

export const useAppErrors = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);
  const errorsRef = useRef(errors);
  errorsRef.current = errors;
  const setErrors = useMemo(() => bindActionCreators(setErrorsAction, dispatch), [dispatch]);
  const addError = useCallback((e: Error) => setErrors([...errorsRef.current, e]), [setErrors]);
  return {
    errors,
    setErrors,
    addError,
  };
};
