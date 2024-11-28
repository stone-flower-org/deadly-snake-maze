import React, { FC, HTMLProps, memo } from 'react';

import { Alert } from './Alert';
import { StyledAlertBarContainer } from './styles';
import { AlertItem } from './types';

export interface AlertBarProps extends Omit<HTMLProps<HTMLDivElement>, 'as'> {
  alerts: AlertItem[];
  onClose: (id: AlertItem['id']) => void;
}

export const DEFAULT_ALERT_BAR_PROPS = {
  'data-test-id': 'alert-bar',
} as const;

export const _AlertBar: FC<AlertBarProps> = ({ alerts, onClose, ...rest }: AlertBarProps) => {
  const props = { ...DEFAULT_ALERT_BAR_PROPS, ...rest };
  return (
    <StyledAlertBarContainer
      {...props}
      role="presentation"
    >
      {alerts.map((alert, i) => (
        <Alert
          {...alert}
          data-test-id={`${props['data-test-id']}-alert-${i}`}
          key={alert.id}
          onClose={onClose}
        />
      ))}
    </StyledAlertBarContainer>
  );
};
export const AlertBar = memo(_AlertBar);
