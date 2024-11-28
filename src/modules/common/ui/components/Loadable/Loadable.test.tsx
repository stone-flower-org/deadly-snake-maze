import React from 'react';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { Loadable, LoadableProps } from './Loadable';

const defaultProps = {
  children: 'Some Content',
  loading: false,
};

const renderLoadable = (props: Partial<LoadableProps> = {}) =>
  renderWithProviders(
    <Loadable
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('Loadable', () => {
  it('should render component with given children when loading false', async () => {
    const { getByText } = renderLoadable();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should render loader when loading true', async () => {
    const { getByRole } = renderLoadable({ loading: true });
    expect(getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });
});
