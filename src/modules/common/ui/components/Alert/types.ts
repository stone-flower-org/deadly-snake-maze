import { ReactNode } from 'react';

import type { TimeoutId } from '@stone-flower-org/js-utils';

export enum AlertType {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

export interface AlertContext {
  alerts: AlertItem[];
  push: (item: AlertItemParams) => void;
  remove: (item: AlertItem['id']) => void;
}

export interface AlertItemParams extends Omit<AlertItem, 'id' | 'timeoutId' | 'lifetime'> {
  lifetime?: number | null;
}

export interface AlertItem {
  id: number;
  lifetime: number | null;
  message?: ReactNode;
  open?: boolean;
  timeoutId?: TimeoutId;
  title: ReactNode;
  type: AlertType;
}
