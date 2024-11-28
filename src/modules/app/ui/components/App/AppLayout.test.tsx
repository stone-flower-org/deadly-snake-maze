import { waitFor, within } from '@testing-library/react';
import React from 'react';

import { DEFAULT_ALERT_BAR_PROPS } from '@/src/modules/common/ui/components/Alert';
import { RenderOptions } from '@/src/modules/tests/types';
import {
  overrideInitialState,
  renderWithProviders,
  setupAndBootApp,
  setupAppService,
  setupStore,
} from '@/src/modules/tests/utils';

import { AppLayout, AppLayoutProps } from './AppLayout';

const content = 'Some content';

const defaultProps = {
  children: <>{content}</>,
};

const renderAppLayout = (props: Partial<AppLayoutProps> = {}, renderProps: RenderOptions = {}) =>
  renderWithProviders(
    <AppLayout
      {...defaultProps}
      {...props}
    />,
    renderProps,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('AppLayout', () => {
  it('should render children', async () => {
    const { getByText } = renderAppLayout();
    expect(getByText(content)).toBeInTheDocument();
  });

  it('should render alerts based on app errors', async () => {
    const error = new Error('Some Error');
    setupAppService(
      'store',
      setupStore({
        preloadedState: overrideInitialState({
          app: {
            errors: [error],
          },
        }),
      }),
    );
    const { getByTestId } = renderAppLayout({});

    const alertBar = getByTestId(DEFAULT_ALERT_BAR_PROPS['data-test-id']);
    expect(alertBar).toBeInTheDocument();
    const { findByText } = within(alertBar);
    await waitFor(async () => {
      expect(await findByText(error.message)).toBeInTheDocument();
    });
  });
});
