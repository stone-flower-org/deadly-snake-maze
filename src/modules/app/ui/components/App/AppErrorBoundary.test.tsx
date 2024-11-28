import React from 'react';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { AppErrorBoundary, AppErrorBoundaryProps } from './AppErrorBoundary';

const content = 'Some content';

const error = new Error('Some error');

const ChildWithError = () => {
  throw error;
};

const defaultProps = {
  children: <>{content}</>,
};

const renderAppErrorBoundary = (props: Partial<AppErrorBoundaryProps> = {}) =>
  renderWithProviders(
    <AppErrorBoundary
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('AppErrorBoundary', () => {
  it('should render children when no errors occur', () => {
    const { getByText } = renderAppErrorBoundary();
    expect(getByText(content)).toBeInTheDocument();
  });

  it('should render error page with error message when error occurs during render', () => {
    const { getByText } = renderAppErrorBoundary({ children: <ChildWithError /> });
    expect(getByText(error.message, { exact: false })).toBeInTheDocument();
  });
});
