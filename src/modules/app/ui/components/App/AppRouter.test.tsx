import { waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { render, setupAndBootApp } from '@/src/modules/tests/utils';

import { AppProviders } from './AppProviders';
import { AppRouter } from './AppRouter';

const defaultProps = {};

const renderAppRouter = (props = {}) =>
  render(
    <AppProviders>
      <AppRouter
        {...defaultProps}
        {...props}
      />
    </AppProviders>,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('AppRouter', () => {
  it('should show loader on first render', async () => {
    const { queryByRole } = renderAppRouter();
    vi.runAllTimersAsync();
    await waitFor(async () => {
      expect(queryByRole('status', { name: /Loading Page.../i })).toBeInTheDocument();
    });
  });
});
