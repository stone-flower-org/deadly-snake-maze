import { useCallback } from 'react';

import { app } from '@/src/modules/app/boot';
import { useAlert } from '@/src/modules/app/ui/hooks';

import { DEFAULT_ALERT_ERROR_TITLE } from './constants';
import { shouldHandleError } from './utils';

export const useErrorHandler = () => {
  const { error } = useAlert();
  return useCallback(
    (e: Error) => {
      if (!shouldHandleError(e)) return;
      app.getService('error-reporter').report(e);
      error({ title: DEFAULT_ALERT_ERROR_TITLE, message: e.message });
    },
    [error],
  );
};
