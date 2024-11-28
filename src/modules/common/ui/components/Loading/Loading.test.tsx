import React from 'react';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { Loading, LoadingProps } from './Loading';

const renderLoading = (props: Partial<LoadingProps> = {}) => renderWithProviders(<Loading {...props} />);

beforeAll(async () => {
  await setupAndBootApp();
});

describe('Loading', () => {
  it('should render component with default props', () => {
    const { getByRole } = renderLoading();
    const loading = getByRole('status', { name: /loading/i });
    expect(loading).toBeInTheDocument();
  });

  it('should render component with given props', () => {
    const className = 'className';
    const role = 'img';
    const title = 'title';
    const { getByRole } = renderLoading({
      className,
      role,
      title,
    });

    const loading = getByRole(role, { name: title });
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveClass(className);
  });
});
