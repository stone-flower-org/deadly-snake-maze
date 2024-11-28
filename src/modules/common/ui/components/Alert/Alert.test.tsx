import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { Alert, AlertProps, DEFAULT_ALERT_PROPS } from './Alert';
import { AlertType } from './types';
import { createAlertItem } from './utils';

const alert = createAlertItem({
  type: AlertType.error,
  title: 'Some Title 0',
  message: 'Some Message 0',
});

const defaultProps = {
  ...alert,
  'data-test-id': DEFAULT_ALERT_PROPS['data-test-id'],
  onClose: vi.fn(),
};

const renderAlert = (props: Partial<AlertProps> = {}) =>
  renderWithProviders(
    <Alert
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('Alert', () => {
  it('should render given alert', () => {
    const { getByText } = renderAlert();
    expect(getByText(defaultProps.title as string)).toBeInTheDocument();
  });

  it('should toggle message when click on header', async () => {
    const { getByTestId, queryByText } = renderAlert();
    const alertHeader = getByTestId(`${defaultProps['data-test-id']}-header`);

    await userEvent.click(alertHeader);
    await waitFor(() => {
      expect(queryByText(defaultProps.message as string)).toBeVisible();
    });

    await userEvent.click(alertHeader);
    await waitFor(() => {
      expect(queryByText(defaultProps.message as string)).not.toBeVisible();
    });
  });

  it('should call onClose with alert after when click on close', async () => {
    const { getByTestId } = renderAlert();
    const closeBtn = getByTestId(`${defaultProps['data-test-id']}-close-btn`);

    await userEvent.click(closeBtn);
    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalledWith(defaultProps.id);
    });
  });
});
