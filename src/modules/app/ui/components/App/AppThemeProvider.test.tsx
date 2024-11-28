import { render } from '@testing-library/react';
import React from 'react';

import { RenderOptions } from '@/src/modules/tests/types';
import { setupAndBootApp } from '@/src/modules/tests/utils';

import { AppThemeProvider, AppThemeProviderProps } from './AppThemeProvider';

const defaultProps = {
  children: 'Some Content',
};

const renderAppThemeProvider = (props: Partial<AppThemeProviderProps> = {}, renderProps: RenderOptions = {}) =>
  render(
    <AppThemeProvider
      {...defaultProps}
      {...props}
    />,
    renderProps,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('AppThemeProvider', () => {
  it('should render provider with given children', async () => {
    const { getByText } = renderAppThemeProvider();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });
});
