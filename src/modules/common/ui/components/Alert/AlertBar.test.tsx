import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';

import { AlertBar, AlertBarProps, DEFAULT_ALERT_BAR_PROPS } from './AlertBar';
import { AlertType } from './types';
import { createAlertItem } from './utils';

const alerts = [
  createAlertItem({
    type: AlertType.error,
    title: 'Some Title 0',
    message: 'Some Message 0',
  }),
  createAlertItem({
    type: AlertType.success,
    title: 'Some Title 1',
    message: 'Some Message 1',
  }),
];

const defaultProps = {
  'data-test-id': DEFAULT_ALERT_BAR_PROPS['data-test-id'],
  alerts: [],
  onClose: vi.fn(),
};

const renderAlertBar = (props: Partial<AlertBarProps> = {}) =>
  render(
    <AlertBar
      {...defaultProps}
      {...props}
    />,
  );

describe('AlertBar', () => {
  it('should render given alerts', () => {
    const { getByTestId } = renderAlertBar({ alerts });

    const alertBar = getByTestId(defaultProps['data-test-id']);
    expect(alertBar).toBeInTheDocument();
    expect(alertBar.childElementCount).toBe(alerts.length);
    alerts.forEach((_, alertI) => {
      const alertComp = getByTestId(`${defaultProps['data-test-id']}-alert-${alertI}`);
      expect(alertComp).toBeInTheDocument();
    });
  });

  it('should call onClose with closing alert id after click on close', async () => {
    const { getByTestId } = renderAlertBar({ alerts });
    const alertCloseBtn = getByTestId(`${defaultProps['data-test-id']}-alert-0-close-btn`);

    await waitFor(async () => {
      await userEvent.click(alertCloseBtn);
    });

    expect(defaultProps.onClose).toHaveBeenCalledWith(alerts[0].id);
  });
});
