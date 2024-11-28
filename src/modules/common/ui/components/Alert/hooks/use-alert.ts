import { useMemo } from 'react';

import { useAlertContext } from '@/src/modules/common/ui/components/Alert/hooks';
import { AlertItemParams, AlertType } from '@/src/modules/common/ui/components/Alert/types';

export type AlertParams = Omit<AlertItemParams, 'type'>;

export const DEFAULT_LIFETIME = 5000;

export const useAlert = () => {
  const { push } = useAlertContext();
  return useMemo(
    () => ({
      error: (params: AlertParams) => {
        push({ lifetime: DEFAULT_LIFETIME, ...params, type: AlertType.error });
      },
      info: (params: AlertParams) => {
        push({ lifetime: DEFAULT_LIFETIME, ...params, type: AlertType.info });
      },
      success: (params: AlertParams) => {
        push({
          lifetime: DEFAULT_LIFETIME,
          ...params,
          type: AlertType.success,
        });
      },
      warning: (params: AlertParams) => {
        push({
          lifetime: DEFAULT_LIFETIME,
          ...params,
          type: AlertType.warning,
        });
      },
    }),
    [push],
  );
};
