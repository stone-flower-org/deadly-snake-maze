import React from 'react';

import { renderWithProviders, setupAndBootApp } from '@/src/modules/tests/utils';

import { Card, CardProps } from './Card';

const defaultProps = {
  children: undefined,
};

const renderCard = (props: Partial<CardProps> = {}) =>
  renderWithProviders(
    <Card
      {...defaultProps}
      {...props}
    />,
  );

beforeAll(async () => {
  await setupAndBootApp();
});

describe('Tooltip', () => {
  it('should render give children', () => {
    const children = 'Children Content';
    const { queryByText } = renderCard({ children });
    expect(queryByText(children)).toBeInTheDocument();
  });
});
