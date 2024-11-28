import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { useAlertContext } from '@/src/modules/common/ui/components/Alert/hooks';
import { AlertType } from '@/src/modules/common/ui/components/Alert/types';
import { createAlertItem } from '@/src/modules/common/ui/components/Alert/utils';

import { AlertProvider, AlertProviderProps } from './AlertProvider';

const initAlerts = [createAlertItem({ type: AlertType.info, title: 'Some Title' })];

const defaultProps = {
  initAlerts,
};

const renderAlertProvider = (props: Partial<AlertProviderProps> = {}) =>
  renderHook(() => useAlertContext(), {
    wrapper: ({ children }) => (
      <AlertProvider
        {...defaultProps}
        {...props}
      >
        {children}
      </AlertProvider>
    ),
  }).result;

beforeEach(() => {
  vi.useFakeTimers().setSystemTime(new Date('2023-01-01 00:00:00.300Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('AlertProvider', () => {
  it('should provide alerts', () => {
    const value = renderAlertProvider();
    expect(value.current.alerts).toBe(initAlerts);
  });

  it('should remove alert when call remove with its id', async () => {
    vi.useRealTimers();
    const value = renderAlertProvider();
    await waitFor(() => {
      value.current.remove(initAlerts[0].id);
    });
    await waitFor(() => {
      expect(value.current.alerts).toHaveLength(0);
    });
  });

  it('should add new alert when call push with alert object', async () => {
    vi.useRealTimers();
    const value = renderAlertProvider();
    const newAlert = createAlertItem({ type: AlertType.info, title: 'New' });
    await waitFor(() => {
      value.current.push(newAlert);
    });
    await waitFor(() => {
      expect(value.current.alerts).toHaveLength(2);
      expect(value.current.alerts[1]).toEqual(
        expect.objectContaining({
          type: newAlert.type,
          title: newAlert.title,
        }),
      );
    });
  });

  it('should add alerts with unique type/title/message combination', async () => {
    vi.useRealTimers();
    const initAlerts = [
      createAlertItem({ type: AlertType.info, title: 'title 1' }),
      createAlertItem({ type: AlertType.info, title: 'title 2' }),
      createAlertItem({
        type: AlertType.info,
        title: 'title 3',
        message: 'message 3',
      }),
    ];
    const value = renderAlertProvider({
      initAlerts,
    });
    const newAlerts = [
      createAlertItem({
        type: AlertType.info,
        title: 'title 1',
        message: 'message 1',
      }),
      createAlertItem({
        type: AlertType.info,
        title: 'title 2',
        message: 'message 2',
      }),
      createAlertItem({
        type: AlertType.error,
        title: 'title 3',
        message: 'message 3',
      }),
      createAlertItem({
        type: AlertType.info,
        title: 'title 3',
        message: 'message 4',
      }),
    ];
    await waitFor(() => {
      [...initAlerts, ...newAlerts].forEach(value.current.push);
    });
    await waitFor(() => {
      expect(value.current.alerts).toHaveLength(initAlerts.length + newAlerts.length);
    });
  });
});
