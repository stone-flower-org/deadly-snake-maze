import { render } from '@testing-library/react';
import React from 'react';

import { setupAndBootApp } from '@/src/modules/tests/utils';

import { AppProviders, AppProvidersProps } from './AppProviders';

const defaultProps = {
  children: 'Some Content',
};

const renderAppProviders = (props: Partial<AppProvidersProps> = {}) =>
  render(
    <AppProviders
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('AppProviders', () => {
  it('should render provider with given children', async () => {
    const { getByText } = renderAppProviders();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });
});
