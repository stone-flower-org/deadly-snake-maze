import { render, renderHook } from '@testing-library/react';
import React from 'react';

import { useConfigs } from '@/src/modules/app/ui/hooks';
import { makeConfigs } from '@/src/modules/tests/mocked-data';
import { RenderOptions } from '@/src/modules/tests/types';

import { ConfigsProvider, ConfigsProviderProps } from './ConfigsProvider';

const defaultProps = {
  children: 'Some Content',
  value: makeConfigs(),
};

const renderConfigsProvider = (props: Partial<ConfigsProviderProps> = {}, renderProps: RenderOptions = {}) =>
  render(
    <ConfigsProvider
      {...defaultProps}
      {...props}
    />,
    renderProps,
  );

const renderWithValueOut = (props: Partial<ConfigsProviderProps> = {}) =>
  renderHook(() => useConfigs(), {
    wrapper: ({ children }) => (
      <ConfigsProvider
        {...defaultProps}
        {...props}
      >
        {children}
      </ConfigsProvider>
    ),
  }).result;

describe('ConfigsProvider', () => {
  it('should render provider with given children', async () => {
    const { getByText } = renderConfigsProvider();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should provide ConfigsContext', async () => {
    const value = renderWithValueOut();
    expect(value.current.APP_LOCALE).toBeDefined();
  });
});
