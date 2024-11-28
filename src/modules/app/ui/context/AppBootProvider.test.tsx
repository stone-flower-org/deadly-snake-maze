import { createProgress } from '@stone-flower-org/js-utils';
import { render, renderHook } from '@testing-library/react';
import React from 'react';

import { useAppBoot } from '@/src/modules/app/ui/hooks';
import { RenderOptions } from '@/src/modules/tests/types';

import { AppBootProvider, AppBootProviderProps } from './AppBootProvider';

const defaultProps = {
  children: 'Some Content',
};

const renderConfigsProvider = (componentProps: Partial<AppBootProviderProps> = {}, renderProps: RenderOptions = {}) => {
  const props = {
    ...defaultProps,
    ...componentProps,
  };
  return render(
    <AppBootProvider
      {...props}
      progress={props.progress ?? createProgress()}
    />,
    renderProps,
  );
};

const renderWithValueOut = (componentProps: Partial<AppBootProviderProps> = {}) => {
  const props = {
    ...defaultProps,
    ...componentProps,
  };
  return renderHook(() => useAppBoot(), {
    wrapper: ({ children }) => (
      <AppBootProvider
        {...props}
        progress={props.progress ?? createProgress()}
      >
        {children}
      </AppBootProvider>
    ),
  }).result;
};

describe('AppBootProvider', () => {
  it('should render provider with given children', async () => {
    const { getByText } = renderConfigsProvider();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should provide AppBootContext', async () => {
    const value = renderWithValueOut();
    expect(value.current.progress).toBeDefined();
  });
});
