import React from 'react';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { DefaultFallback, DefaultFallbackProps } from './DefaultFallback';

const defaultProps = {
  size: undefined,
  title: undefined,
};

const renderDefaultFallback = (props: Partial<DefaultFallbackProps> = {}) =>
  renderWithProviders(
    <DefaultFallback
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('DefaultFallback', () => {
  it('should render fallback with privided title', async () => {
    const title = 'Title Content';
    const { getByLabelText } = renderDefaultFallback({ title });
    expect(getByLabelText(title)).toBeInTheDocument();
  });
});
