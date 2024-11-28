import React, { FC, PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';

import {
  AlertContext as AlertContextInterface,
  AlertItem,
  AlertItemParams,
} from '@/src/modules/common/ui/components/Alert/types';
import { createAlertItem } from '@/src/modules/common/ui/components/Alert/utils';
import { useTimeout } from '@/src/modules/common/ui/hooks';

export const AlertContext = createContext<AlertContextInterface | undefined>(undefined);

export interface AlertProviderProps extends PropsWithChildren<unknown> {
  initAlerts?: AlertItem[];
}

export const AlertProvider: FC<AlertProviderProps> = ({ children, initAlerts = [] }: AlertProviderProps) => {
  const timeout = useTimeout();

  const [alerts, setAlerts] = useState<AlertItem[]>(initAlerts);

  const push: AlertContextInterface['push'] = useCallback(
    (params: AlertItemParams) => {
      const newAlert = createAlertItem(params);

      setAlerts((alerts) => {
        if (
          alerts.find(
            (alert) =>
              alert.message === newAlert.message && alert.title === newAlert.title && alert.type === newAlert.type,
          )
        )
          return alerts;

        if (newAlert.lifetime !== null)
          newAlert.timeoutId = timeout(() => {
            setAlerts((alerts) => alerts.filter(({ id: alertId }) => alertId !== newAlert.id));
          }, newAlert.lifetime);

        return [...alerts, newAlert];
      });
    },
    [timeout],
  );

  const remove: AlertContextInterface['remove'] = useCallback(
    (id: AlertItem['id']) => {
      setAlerts((alerts) =>
        alerts.filter((alert) => {
          if (id !== alert.id) return true;
          alert.timeoutId && timeout.clear(alert.timeoutId);
          return false;
        }),
      );
    },
    [timeout],
  );

  const ctx: AlertContextInterface = useMemo(
    () => ({
      alerts,
      push,
      remove,
    }),
    [alerts, push, remove],
  );

  return <AlertContext.Provider value={ctx}>{children}</AlertContext.Provider>;
};
